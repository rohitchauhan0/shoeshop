const mongoose = require('mongoose')

const productModal = new mongoose.Schema({
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{ 
        type:Number,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true
    },
    ratingAndReviews:[
        {
            type:String,
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    userEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    status:{
        type:String,
    }, 
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
}, {timestamps:true})

module.exports = mongoose.model("Product", productModal)