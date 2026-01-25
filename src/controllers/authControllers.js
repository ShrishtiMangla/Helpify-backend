import bcrypt from "bcryptjs";
import User from "../models/User.js";
import NGO from "../models/NGO.js";
import Agent from "../models/Agent.js";
import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

// ================= LOGIN (ALL ROLES) =================
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password and role are required"
      });
    }

    let user;

    // 🔑 Role-based lookup
    if (role === "user") {
      user = await User.findOne({ email });
    } else if (role === "ngo") {
      user = await NGO.findOne({ email });
    } else if (role === "agent") {
      user = await Agent.findOne({ email });
    }else if (role === "admin") {
      user = await Admin.findOne({ email });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }


    const token = generateToken(user._id, role);

    res.status(200)
      .cookie("token", token, {
        httpOnly: true,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",    // REQUIRED for cross-origin & https
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .json({
        success: true,
        message: "Login successful",
        role,
        user
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};