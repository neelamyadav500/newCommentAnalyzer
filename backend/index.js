require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const CommentAnalyzerRouter = require("./Routes/CommentAnalyzerRouter");

require("./Models/db");

app.use(cors({
    origin: "https://new-comment-analyzer-ui.vercel.app", // Allow frontend
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));

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
