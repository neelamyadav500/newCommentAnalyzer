const { signup, login } = require("../Controllers/AuthController");
const { loginValidation, signupValidation } = require("../Middlewares/AuthValidation");

const router = require("express").Router();

router.post("/login", loginValidation, async (req, res) => {
    try {
        // Pass both req and res to the login function
        await login(req, res); 
    } catch (error) {
        console.error("Login route error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/signup", signupValidation, signup);

module.exports = router;
