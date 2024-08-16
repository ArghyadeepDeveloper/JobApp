import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JobApplier from "../models/jobappliers.model.js";
import upload from "../middlewares/multerConfig.js";
import handleError from "../errors/errorHandler.js";

const register = async (req, res) => {
  const { firstName, lastName, email, city, password, phone, dateOfBirth } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newJobApplier = new JobApplier({
      firstName,
      lastName,
      email,
      city,

      password: hashedPassword,
      phone,
      dateOfBirth,
    });

    await newJobApplier.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    handleError(req, res, error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await JobApplier.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "This email ID is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    handleError(req, res, error);
  }
};

const editProfile = async (req, res) => {
  const { firstName, lastName, email, phone, education } = req.body;
  const userId = req.user.userId;

  try {
    const updatedUser = await JobApplier.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phone, education },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    handleError(req, res, error);
  }
};

const uploadProfilePic = async (req, res) => {
  const userId = req.user.userId;

  try {
    const updatedUser = await JobApplier.findByIdAndUpdate(
      userId,
      { profilePic: req.file.filename }, // Storing the filename
      { new: true }
    );

    res.status(200).json({ message: "Profile picture updated successfully" });
  } catch (error) {
    console.error(error);
    handleError(req, res, error);
  }
};

const uploadResume = async (req, res) => {
  const userId = req.user.userId;

  try {
    const updatedUser = await JobApplier.findByIdAndUpdate(
      userId,
      { resume: req.file.filename }, // Storing the filename
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    handleError(req, res, error);
  }
};

const getProfileDetails = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have user ID in the request object
    const profile = await JobApplier.findById(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        city: profile.city,
        age: profile.age,
        phone: profile.phone,
        resume: profile.resume,
        coverLetter: profile.coverLetter,
        profilePic: profile.profilePic,
        appliedJobs: profile.appliedJobs,
        savedJobIds: profile.savedJobIds,
        skills: profile.skills,
        experience: profile.experience,
        followCompany: profile.followCompany,
        education: profile.education,
        profileSummary: profile.profileSummary,
        currentJobRole: profile.currentJobRole,
        jobExperience: profile.jobExperience,
        projects: profile.projects,
        onlineProfiles: profile.onlineProfiles,
        createdAt: profile.createdAt,
        dateOfBirth: profile.dateOfBirth,
      },
    });
  } catch (err) {
    handleError(req, res, err, "Failed to retrieve profile details");
  }
};

const editPersonalProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      onlineProfiles,
      phone,
      dateOfBirth,
      address,
      languages,
    } = req.body;
    const userId = req.user.userId; // Assuming you have user ID in the request object

    const updatedProfile = await JobApplier.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        onlineProfiles,
        phone,
        dateOfBirth,
        address,
        languages,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: updatedProfile,
    });
  } catch (err) {
    handleError(req, res, err, "Failed to update personal profile");
  }
};

const editCareerDetails = async (req, res) => {
  try {
    const { profileSummary, skills, currentJobRole, experience } = req.body;
    const userId = req.user.userId; // Assuming you have user ID in the request object

    const updatedProfile = await JobApplier.findByIdAndUpdate(
      userId,
      { profileSummary, skills, currentJobRole, experience },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: updatedProfile,
    });
  } catch (err) {
    handleError(req, res, err, "Failed to update career details");
  }
};

export {
  register,
  login,
  editProfile,
  uploadProfilePic,
  uploadResume,
  getProfileDetails,
  editPersonalProfile,
  editCareerDetails,
};
