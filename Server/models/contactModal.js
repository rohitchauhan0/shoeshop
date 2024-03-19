const mongoose = require("mongoose")

const contactUsModal = new mongoose.Schema({
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
    phoneNum:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Contact", contactUsModal)