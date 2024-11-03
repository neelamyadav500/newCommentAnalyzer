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
    origin: "https://new-comment-analyzer-ny.vercel.app", // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Log to confirm middleware is set up
console.log("CORS configured, ready to handle requests");

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/comments", CommentAnalyzerRouter);

const PORT = process.env.PORT || 8080;

app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
