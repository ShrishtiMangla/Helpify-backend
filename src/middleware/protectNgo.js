import jwt from "jsonwebtoken";
import NGO from "../models/NGO.js";

export const protectNGO = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const ngo = await NGO.findById(decoded.id).select("-password");

    if (!ngo) {
      return res.status(401).json({ message: "NGO not found" });
    }

    req.user = ngo; // 🔥 THIS IS REQUIRED
    next();
  } catch (error) {
    console.error("AUTH ERROR 👉", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
