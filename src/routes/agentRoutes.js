import express from "express";
import {
    registerAgent,
    logoutAgent,
} from "../controllers/agentController.js";
import { getAgentDonations } from "../controllers/agentController.js";
import  protectAgent from "../middleware/protectAgent.js";

const router = express.Router();

// ================= REGISTER AGENT =================
router.post("/register", registerAgent);


// ================= LOGOUT AGENT =================
router.get("/logout", logoutAgent);


router.get("/donations", protectAgent,getAgentDonations);


export default router;