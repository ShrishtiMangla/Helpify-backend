import express from "express";
import {
  registerAdmin,
  logoutAdmin,
  getAllDonations
} from "../controllers/adminController.js";

import { protect } from "../middleware/protectAdnim.js";

const router = express.Router();

// ================= REGISTER ADMIN =================
router.post("/register", registerAdmin);

// ================= LOGOUT ADMIN =================
router.get("/logout", logoutAdmin);

router.get("/donations", protect, getAllDonations);


export default router;