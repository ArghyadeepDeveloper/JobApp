import mongoose from "mongoose";

const { Schema } = mongoose;

const jobApplierSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  resume: {
    type: String, // Assuming the resume is stored as a URL or file path
  },
  coverLetter: {
    type: String, // Assuming the cover letter is stored as a URL or file path
  },
  profilePic: {
    type: String, // Filename or URL of the profile picture
  },
  appliedJobs: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  savedJobIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  experience: {
    type: Number,
    default: 0,
  },
  followCompany: {
    type: [Schema.Types.ObjectId],
    ref: "Company",
    default: [],
  },
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  profileSummary: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  languages: {
    type: [String],
    default: [],
  },
  address: {
    type: String,
    default: "",
  },
  currentJobRole: {
    type: String,
    default: "",
  },
  jobExperience: [
    {
      companyName: String,
      role: String,
      startDate: Date,
      endDate: Date,
      responsibilities: String,
    },
  ],
  projects: [
    {
      projectName: {
        type: String,
        required: true,
      },
      projectDetails: {
        type: String,
        required: true,
      },
    },
  ],
  onlineProfiles: [
    {
      profileName: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApplier = mongoose.model("JobApplier", jobApplierSchema);

export default JobApplier;
