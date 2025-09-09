import mongoose from "mongoose";
import { config } from "./config";

export async function connectDb() {
  try {
    mongoose.set("strictQuery", true);
    
    const options = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
      bufferCommands: false,
    };

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(config.mongoUri, options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    console.error("Connection string:", config.mongoUri.replace(/\/\/.*@/, "//***:***@"));
    
    if (error instanceof Error) {
      if (error.message.includes("ENOTFOUND") || error.message.includes("ECONNREFUSED")) {
        console.error("Network connectivity issue. Please check your internet connection and MongoDB Atlas configuration.");
      } else if (error.message.includes("Authentication failed")) {
        console.error("MongoDB authentication failed. Please check your credentials.");
      } else if (error.message.includes("Server selection timed out")) {
        console.error("MongoDB server selection timed out. This usually indicates network connectivity issues or incorrect connection string.");
      }
    }
    
    throw error;
  }
}
