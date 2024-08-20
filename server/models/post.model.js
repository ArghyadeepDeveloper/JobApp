import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    reactions: {
      type: Number,
      default: 0,
    },
    reactedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobApplier", // Assuming you have a User model
      },
    ],
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
