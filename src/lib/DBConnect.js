import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(
      `Error: ${
        error instanceof Error
          ? error.message
          : "Unknown error occurred while connecting to MongoDB"
      }`
    );
    process.exit(1);
  }
};
export default DBConnect;
