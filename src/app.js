import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ MAIN CORS MIDDLEWARE (MOST IMPORTANT)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://meek-cactus-7a5d94.netlify.app"
  ],
  credentials: true
}));

// DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/admins", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is running with MongoDB"
  });
});

export default app;
