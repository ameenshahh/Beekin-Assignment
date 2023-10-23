const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    sendResponseError(400, "You are not authorized ", res);
    return;
  } else if (!authorization.startsWith("Bearer ")) {
    sendResponseError(400, "You are not authorized ", res);
    return;
  }

  try {
    // const payload = await verifyToken(authorization.split(" ")[1]);
    const payload = jwt.verify(
      authorization.split(" ")[1],
      process.env.SECRET_KEY,
      (err, user) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Token verification failed." });
        }

        req.user = user; // Add the user to the request object
        next(); // Pass control to the next middleware or route handler
      }
    );
    console.log(payload);

    if (payload) {
      const user = await UserModel.findById(payload.id, { password: 0 });

      req["user"] = user;

      next();
    } else {
      sendResponseError(400, `you are not authorized`, res);
    }
  } catch (err) {
    console.log("Error ", err);
    sendResponseError(400, `Error ${err}`, res);
  }
};

module.exports = { authenticate };
