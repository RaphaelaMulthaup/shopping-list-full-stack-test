import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Application } from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes";

/**
 * Load environment variables from .env file.
 */
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

/**
 * Middleware Configuration
 * - CORS: Enables Cross-Origin Resource Sharing.
 * - JSON: Parses incoming requests with JSON payloads.
 */
app.use(cors());
app.use(express.json());

/**
 * Route Definitions
 */
app.use("/items", itemRoutes);

/**
 * Establishes a connection to the MongoDB database using the URI provided in environment variables.
 * * @returns {Promise<boolean>} Resolves to true if the connection is successful, false otherwise.
 */
const connectDB = async (): Promise<boolean> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("❌ Error: MONGO_URI is not set.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB successfully connected!");
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return false;
  }
};

/**
 * Orchestrates the application startup sequence.
 * It first attempts to connect to the database and starts the Express server 
 * only if the connection is established.
 */
const startApp = async () => {
  const isConnected = await connectDB();

  if (isConnected) {
    app.listen(port, () => {
      console.log(`🚀 Server runs on port ${port}`);
    });
  } else {
    console.error("🛑 Shutting down: Application failed to connect to the database.");
    process.exit(1);
  }
};

startApp();
