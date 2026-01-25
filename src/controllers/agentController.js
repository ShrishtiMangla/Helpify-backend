import Agent from "../models/Agent.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ================= REGISTER AGENT =================
export const registerAgent = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({
                success: false,
                message: "Agent already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const agent = await Agent.create({
            name,
            email,
            password: hashedPassword,
            phone
        });

        const token = generateToken(agent._id);

        res.status(201)
            .cookie("token", token, {
                httpOnly: true,
                secure: false
            })
            .json({
                success: true,
                message: "Agent registered successfully",
                agent
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// ================= LOGOUT AGENT =================
export const logoutAgent = (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: false
        })
        .json({
            success: true,
            message: "Agent logged out successfully"
        });
};  