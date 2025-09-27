import mongoose from "mongoose";
import { config } from "./config";

let connectionRetries = 5;

const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 5,
  bufferCommands: false,
};

export async function connectDb() {
  try {
    mongoose.set("strictQuery", true);

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(config.mongoUri, options);
    console.log("MongoDB connected successfully");
    connectionRetries = 5;
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
    
    if (connectionRetries > 0) {
      console.log(`Retrying to connect to MongoDB in 5 seconds... (${connectionRetries} retries left)`);
      connectionRetries--;
      setTimeout(connectDb, 5000);
    } else {
      console.error("Could not connect to MongoDB after multiple retries.");
      if (process.env.NODE_ENV === 'production') {
        console.error("Exiting in production mode...");
        throw error;
      } else {
        console.warn("Continuing in development mode without MongoDB connection...");
      }
    }
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected. Retrying to connect...");
  if (connectionRetries > 0) {
    setTimeout(connectDb, 5000);
  }
});
