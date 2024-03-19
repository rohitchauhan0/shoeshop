const OTP = require("../models/OTP");
const Profile = require("../models/profileModal");
const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require('jsonwebtoken');
const mailSender = require("../utils/MailSender")
require('dotenv').config()

//sign up
exports.signUp = async (req, res) => {
  try {
    //fetch details
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassowrd,
      accountType,
      otp,
    } = req.body;
    if (
      !firstName ||
      !email ||
      !password ||
      !confirmPassowrd ||
      !accountType ||
      !otp
    ) {
      res.json({
        success: false,
        message: "All feilds are required",
      });
    }

    //check email exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({
        success: false,
        message: "User already exist",
      });
    }

    //password match or not
    if (password !== confirmPassowrd) {
      res.status(400).json({
        success: false,
        message: "Password and confirmPassword do not matched",
      });
    }

    //find otp in db
    const otpResponse = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(otpResponse);

    if (otpResponse.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== otpResponse[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    //hash passowrd

    const hashPassword = await bcrypt.hash(password, 10);


    //additional details
    const profileDetails = await Profile.create({
      phoneNum: null,
      address: null,
      gender: null,
    });

    //create entry in db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountType,
      additionalDetails: profileDetails._id,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "Sign Up successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

//send otp
exports.sendOtp = async (req, res) => {
  try {
    //fetch data
    const { email } = req.body;

    //check email
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      res.json({
        success: false,
        message: "User already present",
      });
    }

    //generate otp
    let otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    //check otp in db
    const result = await OTP.findOne({ otp: otp });

    //create again otp
    while (result) {
      otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
    }

    //create entry
    const otpPayload = await OTP.create({ email, otp });
    res.status(200).json({
      success: true,
      message: "Otp has been send successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        res.json({
            success:false,
            message:"All feilds are required"
        })
    }

    //check email exist 
    let user = await User.findOne({email}).populate("additionalDetails").exec()
    
    if(!user){
        res.json({
            success:false,
            message:"User not found"
        })
    }
    //compare user password -> if pawword match
    if(await bcrypt.compare(password, user.password)){
        //create payload
        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }
        //create token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"24h"
        })
        user = user.toObject()
        user.token = token
        user.password = undefined
        console.log(user)
        const options= {
            httpOnly:true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        }
        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:"User logged in successfully"
        })
    }
        //if password do not match
    else{
            res.status(401).json({
                success:false,
                message:"Password do not matched"
            })
        }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
    });
  }
};

 
//change password
exports.changePassword = async(req, res)=>{
    try {
        const userDetails = await User.findById(req.user.id)
        const {oldPassword, newPassword } =  req.body

        if(!oldPassword || !newPassword){
            res.json({
                success:false,
                message:"All feilds are required"
            })
        }

        const isOldPassowrdMatch = await bcrypt.compare(oldPassword, userDetails.password)

        if(!isOldPassowrdMatch){
            res.status(401).json({
                success:false,
                message:"Old password do not matched"
            })
        }

        const hashPassowrd = await bcrypt.hash(newPassword, 10)
        const updateUserDetails = await User.findByIdAndUpdate(req.user.id, {password:hashPassowrd}, {new:true})

        try {
            const mailResponse = await mailSender(updateUserDetails.email, "Change password mail", `Hey ${updateUserDetails.firstName}, your passowrd has  been changed`)
            console.log(`Email send successfully to ${updateUserDetails.email}`)
            
        } catch (error) {
            console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
        }

        res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })

        
    } catch (error) {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	
    }
}