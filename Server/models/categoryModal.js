const mongoose = require('mongoose')

const categoryModal = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]
})


module.exports = mongoose.model("Category", categoryModal)