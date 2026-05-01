const mongoose = require("mongoose");

const tokenBlackListSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[,"token is required"]
    }
},{
    timestamps: true
})


const tokenBlackListModule = mongoose.model("blackList",tokenBlackListSchema);
module.exports = tokenBlackListModule;