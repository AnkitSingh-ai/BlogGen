import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => 
      console.log("MongoDB connection established")
    );

    await mongoose.connect(`${process.env.MONGO_URI}/BlogGen`);

  } catch (error) {
    console.error(error.message);
  }
}
export default connectDB;