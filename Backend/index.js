require('dotenv').config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`Server run in ${PORT}`);
    try {
        // Server start hote hi pehla connection attempt yahin kar lega
        await connectToDB();
    } catch (err) {
        console.log("Initial DB connection failed on startup, will retry on request.");
    }
});

app.listen(3000,()=>{
    console.log('Server run in 3000');
})

