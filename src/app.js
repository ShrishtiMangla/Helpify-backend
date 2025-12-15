import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();

// Connect DB (safe for Vercel + local)
connectDB();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://meek-cactus-7a5d94.netlify.app/"
    ],
    credentials: true
  })
);


app.get("/", (req, res) => {
  res.json({ message: "Backend is running with MongoDB" });
});

export default app;
