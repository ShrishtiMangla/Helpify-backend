import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "NGO",
        required: true
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agent"
    },
    type: {
        type: String,
        enum: ["Money", "Goods"]
    }
}, { timestamps: true });

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;