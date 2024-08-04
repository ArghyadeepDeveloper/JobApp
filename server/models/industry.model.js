import mongoose from "mongoose";

const { Schema, model } = mongoose;

const industrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  companyIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: [],
    },
  ],
  subIndustryIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubIndustry",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

industrySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Industry = model("Industry", industrySchema);

export default Industry;
