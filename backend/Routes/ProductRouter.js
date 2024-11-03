const express = require("express");
const { ensureAuthenticated } = require("../Middlewares/Auth");

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
    try {
        console.log("----- Logged in user details -----", req.user);

        res.status(200).json({
            success: true,
            message: "User details retrieved successfully.",
            user: req.user
        });
    } catch (error) {
        console.error("Error retrieving user details:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving user details."
        });
    }
});

module.exports = router;
