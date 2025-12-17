import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {                 // ✅ REQUIRED
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
            "Education",
            "Healthcare",
            "Women Empowerment",
            "Rural Development & Poverty Alleviation",
            "Environment & Wildlife",
            "Child Welfare",
            "Disability Support",
            "Disaster Relief & Humanitarian"
        ],
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const NGO = mongoose.model("NGO", ngoSchema);
export default NGO;
