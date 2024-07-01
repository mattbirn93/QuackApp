import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};
export default connectDB;
/////////
// import mongoose from "mongoose";
// const connectDB = async () => {
//   try {
//     console.log(
//       "Attempting to connect to MongoDB with URI:",
//       process.env.MONGO_URI,
//     );
//     await mongoose.connect(process.env.MONGO_URI, {});
//     console.log("Quack MongoDB connected");
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err.message);
//     process.exit(1);
//   }
// };
// export default connectDB;
//////////////
// import mongoose from "mongoose";
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {});
//     console.log("Quack MongoDB connected");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };
// export default connectDB;
