import Job from "../models/job.model.js";
import Company from "../models/company.model.js";
import City from "../models/city.model.js";
import handleError from "../errors/errorHandler.js";
import JobGiver from "../models/jobGiver.model.js";
import mongoose from "mongoose";

// Add a new job
// export const addJob = async (req, res) => {
//   try {
//     const {
//       name,
//       necessarySkills,
//       cityId,
//       salaryRange,
//       experienceRange,
//       companyId,
//     } = req.body;
//     const jobPoster = req.user.id;

//     // Check if the company exists
//     const jobPosterFound = await JobGiver.findById(jobPoster);
//     console.log("jobposter found", jobPosterFound);
//     if (!jobPosterFound) {
//       res.status(404).status({ message: "Job poster not found" });
//     }

//     const companyFound = await Company.findById(companyId);
//     if (!companyFound) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Company not found" });
//     }

//     // Check if the city exists
//     const cityFound = await City.findById(cityId);
//     if (!cityFound) {
//       return res
//         .status(404)
//         .json({ success: false, message: "City not found" });
//     }

//     const newJob = new Job({
//       name,
//       necessarySkills,
//       cityId,
//       salaryRange,
//       experienceRange,
//       companyId,
//       jobPoster,
//     });

//     await newJob.save();

//     jobPosterFound.postedJobs.push(newJob._id);
//     console.log("jobposter after adding job", jobPosterFound.postedJobs);
//     await jobPosterFound.save();

//     res.status(201).json({
//       success: true,
//       message: "Job created successfully.",
//       job: newJob,
//     });
//   } catch (err) {
//     handleError(req, res, err);
//   }
// };
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

    // Validate companyId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid companyId",
      });
    }

    // Check if the job poster exists
    const jobPosterFound = await JobGiver.findById(jobPoster);
    if (!jobPosterFound) {
      return res.status(404).json({ message: "Job poster not found" });
    }

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

    // Create the new job
    const newJob = new Job({
      name,
      necessarySkills,
      cityId,
      salaryRange,
      experienceRange,
      companyId, // Directly use the validated companyId
      jobPoster,
    });

    await newJob.save();

    // Add the job to the job poster's postedJobs array
    jobPosterFound.postedJobs.push(newJob._id);
    await jobPosterFound.save();

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

export const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user has already applied to this job
    if (job.applicants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }

    // Add the user's ID to the list of applicants
    job.applicants.push(userId);

    // Save the job with the new applicant
    await job.save();

    res.status(200).json({ message: "Application successful" });
  } catch (error) {
    handleError(req, res, error, "Failed to apply to job");
  }
};

export const cancelJobApplication = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user has applied to this job
    const applicantIndex = job.applicants.indexOf(userId);
    if (applicantIndex === -1) {
      return res
        .status(400)
        .json({ message: "You have not applied to this job" });
    }

    // Remove the user's ID from the list of applicants
    job.applicants.splice(applicantIndex, 1);

    // Save the job with the updated applicant list
    await job.save();

    res.status(200).json({ message: "Application canceled successfully" });
  } catch (error) {
    handleError(req, res, error, "Failed to cancel job application");
  }
};
