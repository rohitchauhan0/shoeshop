const mongoose = require("mongoose")

const profileModal = new mongoose.Schema({
    phoneNum:{
        type:String,
        // required:true,
    },
    gender:{
        type:String,
        // required:true
    },
    address:{
        type:String,
        // required:true,
    }
})

module.exports = mongoose.model("Profile", profileModal)