const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email does not exists" });
    }

    console.log(user);
    // Validate the password (you should use a secure password hashing library)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing in" });
  }
};

module.exports = { signin };
