const Category = require("../models/Category.js")
const Product = require("../models/Product.js")
const Review = require("../models/Review.js")
const User = require("../models/User.js")
const uploadImage = require("../utils/uploadImage")
const { validationResult } = require("express-validator")

const AddProduct = async (req, res) => {
  try {
    console.log("heeloo")
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const user = await User.findById(req.body.userId)
    console.log(user)

    const category = await Category.find({ name: req.body.category })
    console.log(category)
    if (!category) {
      return res.status(400).json({ message: "Category Not Found" })
    }

    const product = new Product({
      name: req.body.name,
      categoryId: category[0]._id,
      shopId: user.shopId,
      description: req.body.description,
      price: req.body.price,
      available_quantity: req.body.quantity,
    })

    const image = {
      url: await uploadImage(req.file),
      // color: req.body.colors,
    }

    product.image = image

    // const tags = req.body.tags.split(",")
    // product.tags = tags

    await product.save()
    console.log("Product Added")
    return res.status(200).json({ message: "Product Added" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .populate("shopId", "name avatar")
    return res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProductsByCategory = async (req, res) => {
  try {
    console.log("category products here")
    const categoryId = req.params.categoryId
    const productId = req.params.productId
    console.log(categoryId, productId)
    const products = await Product.find({
      categoryId: categoryId,
      _id: { $ne: productId }, // Exclude the current product
    })
      .populate("categoryId", "name")
      .populate("shopId", "name avatar")
      .sort({ createdAt: -1 })
      .exec()

    console.log(products)

    return res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id
    await Product.findByIdAndDelete(productId)
    return res.status(200).json({ message: "Product Removed " })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)
      .populate("categoryId", "name")
      .populate("shopId", "name avatar")

    // Get the reviews related to this product
    const Reviews = await Review.find({ productId: productId }).populate(
      "userId"
    )

    // Create a temporary field for reviews in the product object

    return res.status(200).json({ product, Reviews })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    await Product.findByIdAndUpdate(productId, req.body)
    return res.status(200).json({ message: "Product Updated" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  AddProduct,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
  getProductsByCategory,
}
