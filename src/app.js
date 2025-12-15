import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://meek-cactus-7a5d94.netlify.app"
    ],
    credentials: true
  })
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is running with MongoDB"
  });
});

export default app;
