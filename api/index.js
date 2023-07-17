import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import playgroundsRoute from "./routes/playgrounds.js";
import courtsRoute from "./routes/courts.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();

const connect = async () => {
    try {
      await mongoose.connect(process.env.KEY);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });  

  app.use(cors())
  app.use(cookieParser())
  app.use(express.json());
  
  app.use("/api/auth", authRoute);
  app.use("/api/users", usersRoute);
  app.use("/api/playgrounds", playgroundsRoute);
  app.use("/api/courts", courtsRoute); 
  
  app.use((err, _req, res, _next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
  });
  