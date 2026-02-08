import Donation from "../models/Donation.js";
import Agent from "../models/Agent.js";

export const createGoodsDonation = async (req, res) => {
  try {
    const { donorId, ngoId, items, address } = req.body;

    if (!items || !address) {
      return res.status(400).json({ message: "Items and address required" });
    }

    // 1️⃣ Find a RANDOM delivery agent
    // We use aggregate with $sample to get a random document
    const randomAgents = await Agent.aggregate([
       // { $match: { status: 'active' } }, // Uncomment if you have an active status
       { $sample: { size: 1 } }
    ]);

    const agent = randomAgents[0];

    if (!agent) {
      return res.status(404).json({ message: "No delivery agent available" });
    }

    // 2️⃣ Create donation
    const donation = await Donation.create({
      donorId,
      ngoId,
      donationType: "goods",
      items,
      agentId: agent._id,
      status: "pending"
    });
    console.log("Goods donation created:", donation);

    res.status(201).json({
      message: "Goods donation created",
      donationId: donation._id,
      agent: {
        name: agent.name,
        phone: agent.phone
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const createDonation = async (req, res) => {
  try {
    console.log("Donation received:", req.body);

    const donation = await Donation.create(req.body);

    console.log("Donation saved:", donation);

    res.status(201).json({
      success: true,
      donation
    });
  } catch (error) {
    console.error("Error saving donation:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save donation"
    });
  }
};

export const getDonationById = async (req, res) => {
  const donation = await Donation.findById(req.params.id)
    .populate("agentId", "name phone");

  if (!donation) {
    return res.status(404).json({ message: "Donation not found" });
  }

  res.json(donation);
};


