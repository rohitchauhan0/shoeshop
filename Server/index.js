const express = require('express')
const app = express()

const UserRoute = require('./routes/User')
const profileRoute = require('./routes/Profile')
const productRoute = require('./routes/Product')
const ContactRoute = require('./routes/Contact')
const categoryRoute = require('./routes/Category')
const paymentRoute = require('./routes/Payment')

//connect with db
require("./config/database").connectDB()
require("./config/cloudinary").cloudinaryConnect()

const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}))

//connect with cloudinary
//dotenv
require('dotenv').config()
//middleware
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

const cookieParser = require('cookie-parser')
app.use(cookieParser())
const cors = require('cors')
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

//mounting

app.use("/api/v1/auth", UserRoute)
app.use("/api/v1/profile", profileRoute)
app.use("/api/v1/product", productRoute)
app.use("/api/v1/reach", ContactRoute)
app.use("/api/v1/category", categoryRoute)
app.use("/api/v1/payment", paymentRoute)








//file uploader



// app.post('/api/v1/product/createProduct', auth, isSeller, createProduct)
  


app.listen(process.env.PORT, (req, res)=>{
    console.log("APP IS RUNNING AT PORT 5000")
})