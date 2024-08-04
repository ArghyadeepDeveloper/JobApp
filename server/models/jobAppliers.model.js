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
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // Assuming the resume is stored as a URL or file path
    required: true,
  },
  coverLetter: {
    type: String, // Assuming the cover letter is stored as a URL or file path
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
  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobApplier = mongoose.model("JobApplier", jobApplierSchema);

export default JobApplier;
