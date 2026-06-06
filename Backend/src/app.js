const express = require("express");
const app = express();
const cookie = require('cookie-parser');
const cors = require('cors');

/* requires all routers  */
const authRouters = require("./routes/authRouter");
const interviwRouter = require("./routes/interviewRouter");


app.use(express.json());
app.use(cookie());
app.use(cors({
    origin: "https://gen-ai-green.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options('*', cors());


/* use All Routers  */
app.use("/api/auth",authRouters);
app.use("/api/inter",interviwRouter)

module.exports = app;