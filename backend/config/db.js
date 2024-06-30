import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(
      "Attempting to connect to MongoDB with URI:",
      process.env.MONGO_URI,
    );
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Quack MongoDB connected");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;

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
