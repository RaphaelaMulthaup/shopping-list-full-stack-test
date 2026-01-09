import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";

dotenv.config();

const app = express(); //Initialize Express Server
const port = process.env.PORT || 3000;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("❌ Fehler: MONGO_URI ist nicht in der .env-Datei gesetzt.");
    return;
  }

  try {
    await mongoose.connect(mongoUri); //Establish database connection
    console.log("✅ MongoDB erfolgreich verbunden!");
    //Start server
    app.listen(port, () => {
      console.log(`🚀 Server läuft auf Port ${port}`);
    });
  } catch (error) {
    console.error(
      "❌ MongoDB Verbindungsfehler. Ist der Docker-Container gestartet? \n Fehler-Details:",
      error
    );
  }
};

connectDB();
