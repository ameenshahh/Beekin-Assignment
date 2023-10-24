const JobsModel = require("../models/JobsModel");


const allJobs = (req, res) => {
  console.log(req);
};

const createJob = async (req, res) => {
  const { jobTitle, jobDescription,lastDate } = req.body;
  if(!jobTitle || !jobDescription|| !lastDate){
    return res.status(401).json({status:false, message: "Missing fields" });
  }

  const user = new JobsModel({ jobTitle, jobDescription ,lastDate});
  await user.save();
};

module.exports = { allJobs };
