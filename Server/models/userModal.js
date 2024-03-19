const mongoose = require("mongoose")

const  userModal = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    }, 
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        required:true,
        enum:["Admin", "Customer", "Seller"]
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    token:{
        type:String
    },
    resetPasswordExpires: {
        type: Date,
    },
    Product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]


})

module.exports = mongoose.model("User", userModal)