const Category = require('../models/categoryModal')
const Product = require('../models/productModal')
const User = require("../models/userModal")
const { uploadImageToCloudinary } = require('../utils/ImageUpload')
require('dotenv').config()

exports.createProduct = async(req, res)=>{
    try {
        const userId = req.user.id
        const {title, description, price, category} = req.body       
        const thumbnail = req.files.thumbnailImage
        console.log(title,description,price)
        if (
            !title || !description || !price || !category || !thumbnail){
            res.json({
                success:false,
                message:"All feilds are require"
            })
        }
        console.log("thumbnail",thumbnail)

        const sellerDetails = await User.findById({_id:userId},{
            accountType :"Seller"
        }) 
        console.log(sellerDetails)


        if(!sellerDetails){
            return res.json({
                success:false,
                message:"Seller details not found"
            })
        }

        const categoryDetails = await Category.findById(category)
        if(!category){
            return res.json({
                success:false,
                message:"Category  not found"
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail, process.env.FOLDER_NAME
        )

        const newProduct = await Product.create(
           {
            title, 
            description,
            price, 
            category : categoryDetails._id,
            seller: sellerDetails._id,
            imageUrl:thumbnailImage.secure_url
           }
        )
        await User.findByIdAndUpdate(
            {_id : sellerDetails._id},
            {
                $push:{
                    Product:newProduct._id
                }
            }, 
            {new:true}
        )

        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push:{
                    Product:newProduct._id,
                }
            }, 
            {new:true}
        )

        res.status(200).json({
            success:true,
            data:newProduct,
            message:"Product created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// //get all product
exports.getAllProducts = async(req, res)=>{
    try {
        const allProducts = await Product.find({}, {title:true, description:true, price:true, imageUrl:true}, {new:true}).populate("seller").exec()

        return res.status(200).json({
			success: true,
			data: allProducts,
		});
        
    } catch (error) {
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Product Data`,
			error: error.message,
		});
    }
}

//product details
exports.getProductDetails = async(req, res)=>{
    try {
        
        const {productId} =  req.body
        const productDetails = await Product.findById({_id:productId}).populate({
            path:"seller",
            populate:{
                path:"additionalDetails"
            },
        }).populate("category")
        .exec()

        if(!productDetails) {
            return res.status(400).json({
                success:false,
                message:`Could not find the coursproduct with ${productId}`,
            });
        }

        return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:productDetails,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Course Details could not fetched ",
        })
    }
}


// //delete product 
exports.deleteProduct = async(req, res)=>{
    try {
        const {productId}= req.body
        console.log(productId)

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "product not found" })
          }
        
        const userEnrrolled = product.userEnrolled
        for(const userId of userEnrrolled){
            await User.findByIdAndUpdate(userId, {
                $pull:{product: productId}
            })
        }

        await Product.findByIdAndDelete(productId)
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
          })
        
    } catch (error) {
        console.error(error)
	  return res.status(500).json({
		success: false,
		message: "Server error",
		error: error.message,
	  })
    }
}


// edit product
exports.editProduct = async(req, res)=>{
    try {
        const {productId} = req.body
        const updates = req.body
        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }

        if(req.files){
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            product.imageUrl = thumbnailImage.secure_url
        }
      
        await product.save()

        const updateProduct = await Product.findOne({_id : productId}).populate({path:"Seller", populate:{
            path:"additionalDetails",
        },}).populate("category").exec()
        res.json({
            success: true,
            message: "Product updated successfully",
            data: updateProduct,
          })

        
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
    }
}

exports.getSellerProduct = async(req, res)=>{
    try {
        const sellerId = req.user.id
        const sellerProduct = await Product.find({seller:sellerId}).sort({createdAt: -1}).populate("category").exec()
        console.log("seller", sellerProduct)
        res.status(200).json({
            success:true,
            data:sellerProduct
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}