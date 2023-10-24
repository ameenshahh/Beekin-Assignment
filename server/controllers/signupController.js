const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the username is already taken
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const user = new UserModel({ email, password });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
    
    res.json({ user,token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = { signup };
