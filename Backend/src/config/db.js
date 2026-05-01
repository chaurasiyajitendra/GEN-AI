const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connect to DB");
    }).catch(err =>{
        console.log("DB connecto err : ",err);
    })
}


module.exports = connectToDB;