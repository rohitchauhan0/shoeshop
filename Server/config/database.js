const mongoose = require('mongoose')
require('dotenv').config()

exports.connectDB = ()=>{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(console.log("CONNECT WITH DATABASE")).catch((error)=>{
        console.log("Error in database.....", error)
        process.exit(1)
    })
}