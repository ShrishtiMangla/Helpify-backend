import express from "express";
import { createGoodsDonation , createDonation , getDonationById } from "../controllers/donationController.js";


const router = express.Router();

router.post("/goods", createGoodsDonation);

router.post("/", createDonation);

router.get("/:id", getDonationById);



export default router;
