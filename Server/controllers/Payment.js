const User = require("../models/userModal");
const Product = require("../models/productModal");
const crypto = require("crypto");
const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const mailSender = require("../utils/MailSender")


exports.capturePayment = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  console.log(productId)

  if (productId.length === 0) {
    return res.json({ success: false, message: "Please provide Product Id" });
  }

  let totalAmount = 0;
  for (const product_id of productId) {
    let product;
    try {
      product = await Product.findById(product_id);
      if (!product) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the product" });
      }

      const uid = new mongoose.Types.ObjectId(userId);
      if (product.userEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "User is already Enrolled" });
      }

      totalAmount += product.price;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
  }

  const currency = "INR";
  const options = {
    amount: totalAmount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, mesage: "Could not Initiate Order" });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body.razorpay_order_id;
  const razorpay_payment_id = req.body.razorpay_payment_id;
  const razorpay_signature = req.body.razorpay_signature;

  const productIds = req.body.productId;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !productIds ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
  if (expectedSignature === razorpay_signature) {
    await userEnrolled(productIds, userId, res);
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  return res.status(200).json({ success: "false", message: "Payment Failed" });
};

async function userEnrolled(productIds, userId, res) {
  if (!productIds || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide data for Products or UserId",
    });
  }
  for (const productId of productIds) {
    try {
      const productEnrolled = await Product.findByIdAndUpdate(
        { _id: productId },
        { $push: { userEnrolled: userId } },
        { new: true }
      );
      if (!productEnrolled) {
        return res
          .status(500)
          .json({ success: false, message: "Product not Found" });
      }
      
      

      
      const userEnrolled = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { Product: productId } },
        { new: true }
      );
        const emailResponse = await mailSender(userEnrolled.email , `Order completed`, `your product ${productEnrolled.title} is successfully dispatched`)

        

    } catch (error) {
   console.log(error);
            return res.status(500).json({success:false, message:error.message});
    }
  }
}



