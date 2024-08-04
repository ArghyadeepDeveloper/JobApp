import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  necessarySkills: {
    type: [String],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  salaryRange: {
    low: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
  },
  experienceRange: {
    low: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
  },
  companyName: {
    type: String,
    required: true,
  },
  jobPoster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobGiver",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
