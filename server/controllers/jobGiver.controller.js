import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JobGiver from "../models/jobGiver.model.js"; // Adjust the path as necessary
import handleError from "../errors/errorHandler.js";
import JobApplier from "../models/jobappliers.model.js";

const saltRounds = 10; // Number of rounds for hashing

export const registerJobGiver = async (req, res) => {
  try {
    const { contactPerson, email, phone, companyId, password } = req.body;
    if (!contactPerson || !email || !phone || !password) {
      handleError(req, res, error, "Please provide all data");
    }
    // Check if email already exists
    const existingJobGiver = await JobGiver.findOne({ email });
    if (existingJobGiver) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save a new JobGiver
    const newJobGiver = new JobGiver({
      contactPerson,
      email,
      phone,
      companyId,
      password: hashedPassword,
    });

    await newJobGiver.save();

    res.status(201).json({ message: "JobGiver registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    handleError(req, res, error, "Internal server error");
  }
};

export const loginJobGiver = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the JobGiver by email
    const jobGiver = await JobGiver.findOne({ email });
    if (!jobGiver) {
      return res.status(404).json({ message: "JobGiver not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, jobGiver.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: jobGiver._id, email: jobGiver.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    handleError(req, res, error, "Internal server error");
  }
};

export const getAllJobApplications = async (req, res) => {
  try {
    const jobGiverId = req.user.id;

    // Find the JobGiver by ID and populate the postedJobs field along with applicants
    const jobGiver = await JobGiver.findById(jobGiverId).populate({
      path: "postedJobs",
      populate: {
        path: "applicants",
        select: "firstName lastName _id",
      },
    });

    if (!jobGiver) {
      return res.status(404).json({ message: "Job Giver not found" });
    }

    // Construct the response data
    const jobApplications = jobGiver.postedJobs.map((job) => ({
      jobId: job._id,
      jobDescription: job.name,
      requiredSkills: job.necessarySkills,
      experienceRequired: job.experienceRange,
      salaryRange: job.salaryRange,
      applicants: job.applicants.map((applicant) => ({
        name: `${applicant.firstName} ${applicant.lastName}`,
        id: applicant._id,
      })),
    }));

    res.status(200).json(jobApplications);
  } catch (error) {
    handleError(req, res, error, "Failed to get job applications");
  }
};
