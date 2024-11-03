const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists. You can log in.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new UserModel({ name, email, password: hashedPassword });

        await userModel.save();
        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (error) {
        console.error("Signup error:", error); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        const errorMsg = "Authentication failed, email or password is invalid!";

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false,
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false,
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
        });
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = {
    signup,
    login,
};
