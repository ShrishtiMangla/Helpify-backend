import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// ================= REGISTER ADMIN =================
router.post("/register", registerAdmin);

// ================= LOGIN ADMIN =================
router.post("/login", loginAdmin);

// ================= LOGOUT ADMIN =================
router.get("/logout", logoutAdmin);

export default router;