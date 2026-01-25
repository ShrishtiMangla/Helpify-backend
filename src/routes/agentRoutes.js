import express from "express";
import {
    registerAgent,
    logoutAgent,
} from "../controllers/agentController.js";

const router = express.Router();

// ================= REGISTER AGENT =================
router.post("/register", registerAgent);


// ================= LOGOUT AGENT =================
router.get("/logout", logoutAgent);

export default router;