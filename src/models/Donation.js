import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true
    },

    donationType: {
      type: String,
      enum: ["money", "goods"],
      required: true
    },

    // 💰 Money donation
    amount: {
      type: Number
    },

    // 📦 Goods donation
    items: {
      type: String // simple text like "Clothes, Books"
    },

    // 🚚 Delivery (only for goods)
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent"
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);
