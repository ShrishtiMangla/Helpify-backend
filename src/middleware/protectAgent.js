import jwt from "jsonwebtoken";
import Agent from "../models/Agent.js";

const protectAgent = async (req, res, next) => {
  try {
    const token = req.cookies.token; // 👈 COOKIE NAME

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Agent.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Agent not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default protectAgent;
