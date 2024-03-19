const Profile = require("../models/profileModal")
const User = require("../models/userModal")
const Product = require("../models/productModal")


//update profile
exports.updateProfile = async(req, res)=>{
    try {
        const {phoneNum, gender, address}= req.body
        const id = req.user.id

        const userDetails = await User.findById(id)
        const profile = await Profile.findById(userDetails.additionalDetails)

        profile.phoneNum = phoneNum
        profile.gender = gender
        profile.address = address
        console.log(profile)

        await  profile.save()
        return res.json({
            success:true,
            message:"Profile update successfully"
        })
        
    } catch (error) {
        console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
    }
}


//get all user details
exports.getAllUserDetails = async(req, res)=>{
    try {
        const id = req.user.id 
        const userDetails = await User.findById(id).populate("additionalDetails").exec()
        console.log(userDetails)
        res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userDetails
        })
        
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}

//delete account
exports.deleteUserAccount = async(req, res)=>{
    try {
        const id = req.user.id

        const user = await User.findById({_id : id})
        if(!user){
            res.json({
                success:false,
                message:"User not found"
            })
        }

        await Profile.findByIdAndDelete({ _id : user.additionalDetails})
        await User.findByIdAndDelete({_id : id})
        res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
        
    } catch (error) {
        console.log(error);
		res.status(500).json({ 
            success: false,
            message: "User Cannot be deleted successfully" 
        });
	
    }
}

//get user buying product details
exports.getProductBuyDetails = async(req, res)=>{
    try {
        const id = req.user.id
        let userDetails = await User.findOne({_id : id}).populate("Product").exec()
        // userDetails = userDetails.toObject()
        console.log(userDetails)

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
          return res.status(200).json({
            success: true,
            data: userDetails.Product,
          })

        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
		success: false,
		message: error.message,
	  })
    }
}

exports.getUserEnrolled = async(req, res)=>{
    try {
        const response = await Product.find({}).populate({
            path:"userEnrolled",
            populate:{
                path:"additionalDetails"
            }
        }).exec()

        let datas = [];
        response.forEach((data)=>{
            if(data.userEnrolled.length > 0){
                datas.push(data)
            }
        })

        res.status(200).json({
            success:true,
            data:datas
        })


      
         
    } catch (error) {
        console.log(error)
    }
}