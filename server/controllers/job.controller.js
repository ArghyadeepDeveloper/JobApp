import Job from "../models/job.model.js";
import Company from "../models/company.model.js";
import City from "../models/city.model.js";
import handleError from "../errors/errorHandler.js";

// Add a new job
export const addJob = async (req, res) => {
  try {
    const {
      name,
      necessarySkills,
      cityId,
      salaryRange,
      experienceRange,
      companyId,
    } = req.body;
    const jobPoster = req.user.id;

    // Check if the company exists
    const companyFound = await Company.findById(companyId);
    if (!companyFound) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    // Check if the city exists
    const cityFound = await City.findById(cityId);
    if (!cityFound) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }

    const newJob = new Job({
      name,
      necessarySkills,
      cityId,
      salaryRange,
      experienceRange,
      companyId,
      jobPoster,
    });

    await newJob.save();
    res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job: newJob,
    });
  } catch (err) {
    handleError(req, res, err);
  }
};

// Get all jobs posted by the job giver
export const getJobsByJobGiver = async (req, res) => {
  try {
    const jobPoster = req.user.id;

    const jobs = await Job.find({ jobPoster }).populate("cityId companyId");
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    handleError(req, res, err);
  }
};

// Edit a job by ID
export const editJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updates = req.body;

    // Check if the city exists if cityId is being updated
    if (updates.cityId) {
      const cityFound = await City.findById(updates.cityId);
      if (!cityFound) {
        return res
          .status(404)
          .json({ success: false, message: "City not found" });
      }
    }

    // Check if the company exists if companyId is being updated
    if (updates.companyId) {
      const companyFound = await Company.findById(updates.companyId);
      if (!companyFound) {
        return res
          .status(404)
          .json({ success: false, message: "Company not found" });
      }
    }

    const job = await Job.findOneAndUpdate(
      { _id: jobId, jobPoster: req.user.id },
      updates,
      { new: true, runValidators: true }
    ).populate("cityId companyId");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you're not authorized to edit this job.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (err) {
    handleError(req, res, err);
  }
};

// Delete a job by ID
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOneAndDelete({
      _id: jobId,
      jobPoster: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you're not authorized to delete this job.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (err) {
    handleError(req, res, err);
  }
};

export const getJobsBySearchTerm = async (req, res) => {
  const { searchParam } = req.params;

  try {
    const regex = new RegExp(searchParam, "i"); // 'i' for case-insensitive search

    const jobs = await Job.find({
      name: regex,
    })
      .select("name experienceRange salaryRange companyId") // Select job title, experience, salary, and companyId
      .populate("companyId", "name profilePicUrl"); // Populate company name and profile pic URL

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error searching for jobs", error });
  }
};
