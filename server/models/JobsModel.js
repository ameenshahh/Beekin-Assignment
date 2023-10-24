const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },
    
    lastDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
