const Product = require("../models/Product.js")
const uploadImage = require("../utils/uploadImage")
const AddProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      categoryId: req.body.categoryId,
      shopId: req.body.shopId,
      description: req.body.description,
      price: req.body.price,
      available_quantity: req.body.quantity,
    })

    const image = {
      url: await uploadImage(req.file),
      color: req.body.color,
    }

    product.image = image

    const tags = req.body.tags.split(",")
    product.tags = tags

    await product.save()
    console.log("Product Added")
    return res.status(200).json({ message: "Product Added" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    return res.status(200).json({ products })
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
    return res.status(200).json(product)
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
}
