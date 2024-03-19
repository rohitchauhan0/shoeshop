const express = require('express')
const { createProduct, getAllProducts, getProductDetails, deleteProduct, editProduct, getSellerProduct } = require('../controllers/Product')
const { isSeller, auth } = require('../middleware/auth')
const router = express.Router()

router.post("/createProduct", auth ,isSeller, createProduct)
router.get("/getAllProduct", getAllProducts)
router.post("/getProductDetails", getProductDetails)
router.delete("/deleteProduct",auth, isSeller, deleteProduct)
router.put("/editProduct",auth , isSeller, editProduct)
router.get("/getSellerProduct", auth, isSeller, getSellerProduct)

module.exports = router