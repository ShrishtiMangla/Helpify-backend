import express from "express";
import {
  registerNGO,
    loginNGO,
    logoutNGO,
} from "../controllers/ngoController.js";

const router = express.Router();

// ================= REGISTER NGO =================
router.post("/register", registerNGO);

// ================= LOGIN NGO =================
router.post("/login", loginNGO);

// ================= LOGOUT NGO =================
router.get("/logout", logoutNGO);

export default router;