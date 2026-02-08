import express from "express";
import NGO from "../models/NGO.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Donation from "../models/Donation.js";

// ================= REGISTER NGO =================
export const registerNGO = async (req, res) => {
    try {
        const { name, email, password, address, category ,verified} = req.body;

        if (!name || !email || !password || !address || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingNGO = await NGO.findOne({ email });
        if (existingNGO) {
            return res.status(400).json({
                success: false,
                message: "NGO already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const ngo = await NGO.create({
            name,
            email,
            password: hashedPassword,
            address,
            category
        });

        const token = generateToken(ngo._id);

        res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: false
            })
            .json({
                success: true,
                message: "NGO registered successfully",
                ngo
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ================= LOGOUT NGO =================
export const logoutNGO = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        .json({
            success: true,
            message: "Logged out successfully"
        });
};


export const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find().select("-password");
    res.status(200).json({
      success: true,
      ngos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch NGOs"
    });
  }
};


export const getNgoDonations = async (req, res) => {
  try {
    console.log("REQ.USER 👉", req.user); // 🔥 VERY IMPORTANT

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const donations = await Donation.find({ ngoId: req.user._id })
      .populate("donorId", "username email")
      .populate("agentId", "name phone");

    res.json(donations);
  } catch (err) {
    console.error("NGO DONATION ERROR 👉", err);
    res.status(500).json({ message: "Server error" });
  }
};


