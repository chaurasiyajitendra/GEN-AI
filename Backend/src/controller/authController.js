const userModel = require("../models/userModels");
const bcrpt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const tokenBlackListModule = require("../models/tokenBlackList");
const emailServices = require("../services/email");
const otpStore = new Map();


/**
 * @name registerController
 * @description Register a new user
 * @access Public
 */
async function registerUser(req,res) {

    try{
        const {name,email,password,phoneNumber,location,bio,education} = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({
                message:"name, email , password are required"
            })
        }

        const isExist = await userModel.findOne({
            $or: [{email},{name}]
        });

        if(isExist){
            return res.status(400).json({
                message:"User Already have account"
            })
        }

        const hash = await bcrpt.hash(password,10);

        const user = await userModel.create({
            name,
            email,
            password:hash,
            phoneNumber,
            location,
            bio,
            education
        });

        const token = jwt.sign({id:user._id,username:user.name},process.env.JWT_SECRET,{expiresIn:"1d"})

        req.cookie = ("token",token);
        res.status(201).json({
            message:"User Created ",
            user
        },token)


    }catch(err){
        return res.status(500).json({
            message:`Something err in register : ${err.message}`,
            err
        })
    }
}

/**
 * @name loginController
 * @description Login a existing user
 * @access Public
 */
async function loginUser(req,res) {

    try{
        const {email , password} = req.body;

        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                message:"Inavlid email or password"
            })
        }

        const match = await bcrpt.compare(password,user.password);

        if(!match){
            return res.status(400).json({
                message:"Inavlid email or password"
            })
        }

        const token = jwt.sign({id:user._id,username:user.name},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("token",token);

        await emailServices.sendWelcomeEmail(user.email,user.name);
        
        res.status(200).json({
            message:"user login",
            user
        },token)
        
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message:"Some error in login",
            err
        })
    }
}

/**
 * @name logOutController
 * @description Logout a existing user
 * @access Public
 */
async function logoutUser(req,res) {
    try
    {
        const { token } = req.cookies;

        if(!token)
        {
            return res.status(400).json({
                message:"User not login yet"
            })
        }

        const ifBlackList = await tokenBlackListModule.findOne({token})


        const blackToken = await tokenBlackListModule.create({
            token
        });

        res.clearCookie("token");
        res.status(200).json({
            message:"User logout "
        })

    }catch(err)
    {
        console.log(err);
        return res.status(400).json({
            message:"Some erro in logout"
        })
    }
}

/**
 * @name profileController
 * @description fatching a data 
 * @access Private
 */
async function profileUser(req,res) {
    try{
        const user  = await userModel.findById(req.user.id);
        res.status(200).json({
            message:"Profile facthing",
            user
        }) 
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message:"some err in controller in profile"
        })
    }
}


/**
 * @name updateUSer
 * @description Update a data 
 * @access Private
 */

async function updateUser(req, res) {
  const { name, email, phoneNumber, bio, education, location } = req.body;

  try {
    const updateFields = {};

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (bio) updateFields.bio = bio;
    if (education) updateFields.education = education;
    if (location) updateFields.location = location;

    // Step 2: Update user
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    // Step 3: Handle case if user not found
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error in updateProfile controller",
    });
  }
}

/**
 * @name changePassword
 * @description change the password
 * @access Private
 */
async function changePassword(req,res) {

    const {currentPassword, newPassword,confirmPassword} = req.body;
    try {

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "New passwords do not match",
            });
        }

        const user = await userModel.findById(req.user.id).select("+password");


        const isMatch = await bcrpt.compare(currentPassword,user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect",
            });
        }

        const hashPassword = await bcrpt.hash(newPassword,10)

        user.password = hashPassword;
        await user.save();

        return res.status(200).json({
            message: "Password updated successfully",
        })

        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
        message: "Error in updateProfile controller",
    });
  }
}

/**
 * @name genrateOTP
 * @description Genrate Otp 
 * @access Private
 */
async function genrateOtp(req,res) {
    try {
        const user = await userModel.findById(req.user.id);

        const otp = Math.floor(100000 + Math.random() * 900000);

        otpStore.set(user.email, {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        await emailServices.sendPaymentOTPEmail(user.email, user.name, otp);

        res.status(200).json({
            message:"Otp Genrate"
        })

        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
        message: "Error in Otp genrate",
        });
    }
}

/**
 * @name upgardePlan
 * @description Add credit payment 
 * @access Private
 */
async function upgardePlan(req,res) {

    const {otp,plan} = req.body;
    try {
        const user = await userModel.findById(req.user.id);
        const genOtp = otpStore.get(user.email);


        if(genOtp.expiresAt < Date.now())
        {
            return res.status(204).json({
                message:"OTP Expire"
            })
        }

        if(parseInt(otp) !== genOtp.otp)
        {
            return res.status(404).json({
                message:"Invalid OTP"
            })
        }

        if(plan === 'starter')
        {
            user.credit += 100
            user.save();
        }else if(plan === 'pro')
        {
            user.credit += 600
            user.save();
        }else if(plan === 'premium')
        {
            user.credit += 1200
            user.save();
        }

        otpStore.delete(user.email);
        
        res.status(200).json({
            message:"Payemt succesfull"
        })
            
    } catch (err) {
        console.log(err);
        return res.status(500).json({
        message: "Error in Otp Virfication",
    });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    profileUser,
    updateUser,
    changePassword,
    genrateOtp,
    upgardePlan
}