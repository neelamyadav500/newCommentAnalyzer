const { signup, login } = require("../Controllers/AuthController");
const { loginValidation, signupValidation } = require("../Middlewares/AuthValidation");
const router = require("express").Router();

router.post("/login", loginValidation, async (req, res) => {
    try {
        const result = await login(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error("Login route error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/signup", signupValidation, async (req, res) => {
    try {
        const result = await signup(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Signup route error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
