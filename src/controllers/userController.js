import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const { username, email ,password } = req.body;

    if (!username || !email || !password ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id);

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: false
      })
      .json({
        success: true,
        message: "User registered successfully",
        user
      });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ================= LOGOUT =================
export const logoutUser = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(0)
    })
    .json({
      success: true,
      message: "Logged out successfully"
    });
};
