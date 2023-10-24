const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const signupRouter = require("./routes/signupRouter");
const signinRouter = require("./routes/signinRouter");
const jobsRouter = require("./routes/jobsRouter");
const authenticateRouter = require("./routes/authenticateRouter");

const app = express();
require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/signup',signupRouter)
app.use('/signin',signinRouter)
app.use('/jobs',jobsRouter)
app.use('/isloggedin',authenticateRouter)