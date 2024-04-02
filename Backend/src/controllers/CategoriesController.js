const Category = require("../models/Category")
const uploadImage = require("../utils/uploadImage")

const addCategory = async (req, res) => {
  try {
    const alreadyExists = await Category.findOne({ name: req.body.name })
    if (alreadyExists) {
      return res.status(400).json({ message: "Category Already Exists" })
    }

    const category = new Category({
      name: req.body.name,
      image: await uploadImage(req.file),
      description: req.body.description,
    })

    await category.save()
    console.log("Category Added")
    return res.status(200).json({ message: "Category Added" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
    return res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const removeCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    await Category.findByIdAndDelete(categoryId)
    return res.status(200).json({ message: "Category Removed " })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const category = await Category.find({ _id: categoryId })

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" })
    }

    return res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id

    const category = await Category.findById(categoryId)

    if (!category) {
      return res.status(404).json({ message: "Category Not Found" })
    }

    console.log(req.body, req.file)

    category.name = req.body.name ? req.body.name : category.name
    category.image = req.file ? await uploadImage(req.file) : category.image
    category.description = req.body.description
      ? req.body.description
      : category.description

    await category.save()

    return res.status(200).json({ message: "Category Updated" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addCategory,
  getCategories,
  removeCategory,
  getCategory,
  updateCategory,
}
