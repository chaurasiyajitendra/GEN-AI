const mongoose = require("mongoose");
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:[true,"User alreadey exist"]
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:[true,"email already exist"],
        validate: {
        validator: isEmail, // The validator function from the library
        message: 'Please enter a valid email address.'
        }
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    phoneNumber:{
        type:Number,
        required:true 
    },
    location:{
        type:String,
        required:[true,"Location required for job Resume creation"]
    },
    bio:{
        type:String,
        required:true,
    },
    education:{
        type:String,
        items:[String]
    },
    credit:{
        type:Number,
        default:500
    }
})


const userModel = mongoose.model("user",userSchema);
module.exports = userModel;