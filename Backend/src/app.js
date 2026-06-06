if (typeof global.DOMMatrix === 'undefined') {
    global.DOMMatrix = class DOMMatrix {};
}
if (typeof global.ImageData === 'undefined') {
    global.ImageData = class ImageData {};
}
if (typeof global.Path2D === 'undefined') {
    global.Path2D = class Path2D {};
}

const express = require("express");
const app = express();
const cookie = require('cookie-parser');
const cors = require('cors');

/* Requires all routers */
const authRouters = require("./routes/authRouter");
const interviwRouter = require("./routes/interviewRouter");

// 1. Core Parsers
app.use(express.json());
app.use(cookie());

// 2. Strict CORS Configuration
const corsOptions = {
    origin: "https://gen-ai-green.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
};

app.use(cors(corsOptions));

// 3. Catch OPTIONS Requests Instantly (Before anything else runs)
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.setHeader("Access-Control-Allow-Origin", "https://gen-ai-green.vercel.app");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
        return res.status(200).json({}); // Force 200 OK status instantly
    }
    next();
});

/* Use All Routers */
app.use("/api/auth", authRouters);
app.use("/api/inter", interviwRouter);

// 4. Global Error Handling Middleware
// This prevents the whole serverless function from throwing a 500 crash without CORS headers
app.use((err, req, res, next) => {
    console.error("Server Error Context:", err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;