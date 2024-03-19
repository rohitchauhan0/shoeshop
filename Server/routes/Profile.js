const express = require('express')
const { updateProfile, getAllUserDetails, deleteUserAccount, getProductBuyDetails, getUserEnrolled } = require('../controllers/Profile')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.delete("/deleteAccount", auth, deleteUserAccount)
router.get("/getProductBuyDetail", auth, getProductBuyDetails)
router.get("/getUserEnrolled", getUserEnrolled)

module.exports = router