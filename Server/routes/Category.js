const express = require('express')
const { auth, isSeller } = require('../middleware/auth')
const { createCategory, showAllCategory, categoryPageDetails, allCategoryproducts } = require('../controllers/Category')
const router = express.Router()

router.post("/createcategory",auth, isSeller, createCategory)
router.get("/getAllCategory", showAllCategory)
router.post("/categoryPageDetails", categoryPageDetails)
router.get("/allCategoryproducts",  allCategoryproducts)


module.exports = router