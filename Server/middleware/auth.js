const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", token)
    const token = req.cookies.token 
    || req.body.token 
    || req.header("AuthoriZation").replace("Bearer ", "");
console.log("AFTER ToKEN EXTRACTION");



    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }


    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
          success: false,
          message: "token is invalid",
        });
    }

    next();

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.isCustomer = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Customer") {
      res.status(401).json({
        success: false,
        message: "This is protected route for customer",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};


exports.isSeller = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Seller") {
      res.status(401).json({
        success: false,
        message: "This is protected route for Seller",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};



exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      res.status(401).json({
        success: false,
        message: "This is protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
