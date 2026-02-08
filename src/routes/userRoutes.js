import express from "express";
import {
  registerUser,
  logoutUser,
  getUserDonations,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/protectUser.js";

const router = express.Router();

// ================= REGISTER USER =================
router.post("/register", registerUser);

// ================= LOGOUT USER =================
router.get("/logout", logoutUser);


router.get("/donations", protectUser, getUserDonations);

export default router;