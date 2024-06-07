const express = require("express")
const router = express.Router()
const {
  addOrUpdateCategory,
  getCategories,
  removeCategory,
  getCategory,
  updateCategory,
} = require("../controllers/CategoriesController")
const upload = require("../utils/multer")

router.get("/", getCategories)
router.get("/:id", getCategory)
router.post("/add/:id", upload.single("image"), addOrUpdateCategory)
router.delete("/remove/:id", removeCategory)
router.put("/update/:id", updateCategory)

module.exports = router
