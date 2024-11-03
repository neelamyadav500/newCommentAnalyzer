require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const CommentAnalyzerRouter = require("./Routes/CommentAnalyzerRouter");

require("./Models/db");

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: "https://new-comment-analyzer-ny.vercel.app", // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Enable cookies and authentication headers
}));

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/comments", CommentAnalyzerRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!'); // Send a generic error message
});

const PORT = process.env.PORT || 8080;

app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
