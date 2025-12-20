import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// ================= REGISTER ADMIN =================
router.post("/register", registerAdmin);

// ================= LOGOUT ADMIN =================
router.get("/logout", logoutAdmin);

export default router;