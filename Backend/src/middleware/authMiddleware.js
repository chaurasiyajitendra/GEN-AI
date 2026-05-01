const jwt = require("jsonwebtoken");
const tokenBlackListModule = require("../models/tokenBlackList");


async function authUser(req,res,next)
{
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({
            message:"Unauthorized user"
        })
    }

    const isBlackList = await tokenBlackListModule.findOne({token});
    if(isBlackList)
    {
        return res.status(400).json({
            message:"Invalid Token use"
        })
    }

    try{
        const data = jwt.verify(token , process.env.JWT_SECRET);
        req.user = data;
        next()
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message:"Some error in middleware"
        })
    }
}

module.exports ={
    authUser
}