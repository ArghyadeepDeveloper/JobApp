import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobApplier",
    },
  ],
  jobPosters: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobGiver",
      },
    ],
    default: [],
  },
  postedJobs: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    default: [],
  },
  profilePictureURL: {
    type: String,
  },
  coverPictureURL: {
    type: String,
  },
  posts: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
    default: [],
  },
  ratings: {
    type: Number,
    default: null,
  },
  reviews: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  industryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Industry",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobGiver",
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

companySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Company = model("Company", companySchema);

export default Company;
