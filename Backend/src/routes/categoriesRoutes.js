const express = require("express")
const router = express.Router()
const uploadImage = require("../utils/uploadImage")
const {
  addCategory,
  getCategories,
  removeCategory,
  getCategory,
  updateCategory,
} = require("../controllers/CategoriesController")
const upload = require("../utils/multer")

router.post("/add", upload.single("image"), addCategory)
router.get("/", getCategories)
router.delete("/remove/:id", removeCategory)
router.get("/:id", getCategory)
router.put("/update/:id", updateCategory)

module.exports = router
