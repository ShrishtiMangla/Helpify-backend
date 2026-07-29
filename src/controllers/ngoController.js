import express from "express";
import NGO from "../models/NGO.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import axios from "axios";
import { getDistance } from "geolib";
import Donation from "../models/Donation.js";

// ================= REGISTER NGO =================
export const registerNGO = async (req, res) => {
  try {
    const { name, email, password, address, category, verified } = req.body;

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

export const getRecommendedNGOs = async (req, res) => {
  async function getCoordinates(address) {
    const response = await axios.get("https://nominatim.openstreetmap.org/search",
      {
        params: { q: address, format: "json", limit: 1, },
        headers: { "User-Agent": "Helpify/1.0" }
      });
    if (!response.data.length) return 0;
    return {
      latitude: Number(response.data[0].lat),
      longitude: Number(response.data[0].lon)
    };
  }
  try {
    const { pickupAddress, item, ngoPreference } = req.body;

    if (!pickupAddress || !item || !ngoPreference) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const ngos = await NGO.find().select("-password");

    const userCoordinates = await getCoordinates(pickupAddress);

    if (!userCoordinates) {
      return res.status(400).json({
        message: "Invalid pickup address",
      });
    }

    const recommendedNGOs = [];

    for (const ngo of ngos) {
      try {
        const ngoCoordinates = await getCoordinates(ngo.address);

        if (!ngoCoordinates) continue;

        const distance = getDistance(
          userCoordinates,
          ngoCoordinates
        );
       
        const mlResponse = await axios.post(
          "http://localhost:5001/predict",
          {
            distance_km: distance / 1000,
          ngo_category: ngo.category,
          preferred_category: ngoPreference,
          item,
          }
        );

        recommendedNGOs.push({
          ...ngo.toObject(),
          distance,
          score: mlResponse.data.prediction[0],
        });

      } catch (err) {
        console.log(err);
      }
    }

    recommendedNGOs.sort(
      (a, b) => b.score - a.score
    );
    console.log(recommendedNGOs);
    res.status(200).json({
      success: true,
      ngos: recommendedNGOs,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};