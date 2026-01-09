import * as dotenv from "dotenv";
import mongoose from "mongoose";
import express, { Application } from "express";
import cors from 'cors';
import itemRoutes from './routes/itemRoutes';

dotenv.config();

const app: Application = express(); //Initialize Express Server
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/items', itemRoutes);

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
