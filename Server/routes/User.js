const express = require('express')
const { signUp, sendOtp, login, changePassword } = require('../controllers/Auth')
const { auth, isCustomer, isAdmin } = require('../middleware/auth')
const { resetPassword, resetPasswordToken } = require('../controllers/ResetPassword')
const router = express.Router()

router.post("/signup", signUp)
router.post("/sendotp", sendOtp)
router.post("/login", login)
router.post("/changePassword",auth, changePassword)
router.post("/reset-password-token",resetPasswordToken )
router.post("/reset-password", resetPassword)
router.get("/customer", auth, isCustomer, (req, res)=>{
    res.json({
        message:"Welcome to the the customer route"
    })
})

router.get("/admin", auth, isAdmin, (req, res)=>{
    res.json({
        message:"Welcome to the the admin route"
    })
})


module.exports = router