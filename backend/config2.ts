import mongoose from "mongoose";

const connectDB = async (MONGO_URI: string | undefined) => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {});
    console.log("MongoDB connected");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
