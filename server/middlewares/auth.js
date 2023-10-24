const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const authenticate = async (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token verification failed." });
      }
      
      // Inside the callback, user contains the payload
      req.user = user; // Add the user to the request object

      // You can now access the user object here
      const payload = user;
      
      console.log(`payload is`, payload);
      if (payload) {
        const user = await UserModel.findOne({ email: payload.email });
        
        req.user= user;
        console.log(`req is`, req);

        next();
      } else {
        return res
          .status(400)
          .json({ status: false, message: "you are not authorized" });
      }
    });
  } catch (err) {
    console.log("Error ", err);
    return res
      .status(400)
      .json({ status: false, message: "Something went wrong" });
  }
};

module.exports = { authenticate };
