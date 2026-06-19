import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is required");
    }

    mongoose.connection.on("connected", () => 
      console.log("MongoDB connection established")
    );

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME || "BlogGen",
    });

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
export default connectDB;
