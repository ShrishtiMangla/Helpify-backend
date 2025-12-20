import express from "express";
import {login} from "../controllers/authControllers.js";

const router = express.Router();

// ================= LOGIN (ALL ROLES) =================
router.post("/login", login);
    
export default router;