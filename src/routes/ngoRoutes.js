import express from "express";
import {
  registerNGO,
    logoutNGO,
    getAllNGOs
} from "../controllers/ngoController.js";

const router = express.Router();

// ================= REGISTER NGO =================
router.post("/register", registerNGO);

// ================= LOGOUT NGO =================
router.get("/logout", logoutNGO);

// ================= GET ALL NGOs =================
router.get("/", getAllNGOs);

export default router;