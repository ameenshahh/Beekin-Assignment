const express = require("express");
const router = express.Router();
const {authenticate} = require('../middlewares/auth')


const { allJobs } = require("../controllers/jobsController");
console.log(authenticate)

router.get("/",authenticate,allJobs);


module.exports= router