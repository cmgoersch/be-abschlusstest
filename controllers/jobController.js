import Job from "../models/Job.js";
import User from "../models/User.js";

exports.addJob = async (req, res) => {
  if (req.user.role !== "company") {
    return res.status(403).json({ error: "Only companies can post Jobs" });
  } 
  const job = await Job.create({
    ...req.body,
    company: req.user._id,
  });
  res.status(201).json({
    message: "Job created successfully",
    job,
  });

  exports.applyJob = async (req, res) => {
    if(req.user.role !== "applicant") {
      return res.status(403).json({ error: "Only applicants can apply for jobs" });
    }
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    if (!job.applicants.includes(req.user._id)) {
        job.applicants.push(req.user._id);
        await job.save();
        res.status(200).json({
            message: "Application successful",
            job,
        });
        }
    }
} 
