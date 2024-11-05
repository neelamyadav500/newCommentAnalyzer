require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const CommentAnalyzerRouter = require("./Routes/CommentAnalyzerRouter");

require("./Models/db");

app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://new-comment-analyzer-ny.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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
