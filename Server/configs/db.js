import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => 
      console.log("MongoDB connection established")
    );

    await mongoose.connect(`${process.env.MONGO_URI}/BlogGen`);
    console.log("✅ Database connected successfully");
    return true;

  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}
export default connectDB;