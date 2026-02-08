import express from "express";
import {
  registerNGO,
    logoutNGO,
    getAllNGOs,
    getNgoDonations
} from "../controllers/ngoController.js";
import {protectNGO} from "../middleware/protectNgo.js";

const router = express.Router();

// ================= REGISTER NGO =================
router.post("/register", registerNGO);

// ================= LOGOUT NGO =================
router.get("/logout", logoutNGO);

// ================= GET ALL NGOs =================
router.get("/", getAllNGOs);

router.get("/donations", protectNGO ,getNgoDonations);

export default router;