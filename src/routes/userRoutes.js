import express from "express";
import {
  registerUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

// ================= REGISTER USER =================
router.post("/register", registerUser);

// ================= LOGOUT USER =================
router.get("/logout", logoutUser);

export default router;