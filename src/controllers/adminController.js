import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ================= REGISTER ADMIN =================
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(admin._id);

        res.status(201)
            .cookie("token", token, {
                httpOnly    : true,
                secure      : false
            })
            .json({
                success: true,
                message: "Admin registered successfully",
                admin
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

   
// ================= LOGOUT ADMIN =================
export const logoutAdmin = (req, res) => {
    res
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        .json({
            success: true,
            message: "Admin logged out successfully"
        });
}
;       