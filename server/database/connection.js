import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const uri = process.env.DB_URL; // Replace with your MongoDB URI
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToDatabase;
