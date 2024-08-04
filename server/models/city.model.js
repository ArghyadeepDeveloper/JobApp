import mongoose from "mongoose";

const { Schema, model } = mongoose;

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
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

citySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const City = model("City", citySchema);

export default City;
