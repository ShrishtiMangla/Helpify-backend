import express from "express";
import donationSchema from "../models/Donation.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Donation received:", req.body); // 👈 ADD THIS

    const donation = await donationSchema.create(req.body);

    console.log("Donation saved:", donation); // 👈 ADD THIS
    res.status(201).json({
      success: true,
      donation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save donation"
    });
  }
});

export default router;
