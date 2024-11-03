require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const CommentAnalyzerRouter = require("./Routes/CommentAnalyzerRouter");

// Connect to the database
require("./Models/db");

// Middleware
app.use(express.json()); // Use express built-in json parser
app.use(cors({
    origin: "https://new-comment-analyzer-ny.vercel.app", // Specify your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Enable cookies and authentication headers
}));

// Define routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/comments", CommentAnalyzerRouter);

// Test route
app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!'); // Send a generic error message
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
