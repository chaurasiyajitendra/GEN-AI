require('dotenv').config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");



app.use(async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});

app.listen(3000,()=>{
    console.log('Server run in 3000');
})

