const jwt = require("jsonwebtoken");

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    // Split the token from "Bearer {token}" format
    const token = auth.split(" ")[1]; 
    if (!token) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Attach the decoded user data to the request object
        next();
    } catch (e) {
        return res.status(403).json({ message: "Unauthorized, JWT token is wrong or expired" });
    }
};

module.exports = { ensureAuthenticated };
