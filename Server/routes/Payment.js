const express = require('express')
const { capturePayment, verifyPayment } = require('../controllers/Payment')
const { auth, isCustomer } = require('../middleware/auth')
const router = express.Router()

router.post("/capturePayment",auth, isCustomer,  capturePayment)
router.post("/verifyPayment", auth, isCustomer, verifyPayment)

module.exports = router