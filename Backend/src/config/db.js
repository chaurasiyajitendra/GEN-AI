const mongoose = require('mongoose');

async function connectToDB() {
    // If we already have an active connection, don't open a new one
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        // Force the code to await a solid connection before moving forward
        await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false, // Prevents queries from freezing if connection drops
        });
        console.log("Connected to DB successfully!");
    } catch (err) {
        console.log("DB connection error: ", err);
        throw err; // Forward error so server logs track it
    }
}

module.exports = connectToDB;

