require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const CommentAnalyzerRouter = require("./Routes/CommentAnalyzerRouter");

require("./Models/db");

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://new-comment-analyzer-ui.vercel.app"); // Replace with frontend URL
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(bodyParser.json());

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/comments", CommentAnalyzerRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Comment Analyzer API!");
});

app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
