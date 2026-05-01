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
    origin: "http://localhost:5173",
    credentials: true
}))


/* use All Routers  */
app.use("/api/auth",authRouters);
app.use("/api/inter",interviwRouter)

module.exports = app;