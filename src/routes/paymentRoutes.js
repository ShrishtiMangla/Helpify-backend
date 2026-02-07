import express from "express";
import razorpay from "../utils/razorpay.js";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100, // rupees → paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;
