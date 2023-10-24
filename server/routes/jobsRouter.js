const express = require("express");
const router = express.Router();
const {authenticate} = require('../middlewares/auth')

console.log(`authenticate is ${authenticate} `)

const { allJobs, createJob } = require("../controllers/jobsController");
console.log(authenticate)

router.get("/",authenticate,allJobs);
router.post("/createJob",authenticate,createJob);


module.exports= router