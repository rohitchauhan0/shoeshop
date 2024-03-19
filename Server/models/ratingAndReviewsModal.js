const mongoose = require("mongoose");

const ratingAndReviewsModal = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  reviews:{
    type:String,
    required:true
  },
  product:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }]
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewsModal)
