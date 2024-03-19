const category = require("../models/categoryModal");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const categoryDetails = await category.create({
      name,
    });
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await category.find({}, {name:true});
    res.status(200).json({
      success: true,
      data: allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.allCategoryproducts = async(req, res)=>{
  try {
    const allCategoryproducts = await category.find({}).populate("Product").exec()
    console.log(allCategoryproducts)
    res.status(200).json({
      success:true,
      data:allCategoryproducts,
      message:"All products are fetched",
    })
    
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log(categoryId)
    const selectedCategory = await category
      .findById(categoryId)
      .populate("Product")
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: selectedCategory
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
