const router = require("express").Router()
const { body } = require("express-validator")

const {
  addOrEditProduct,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
  getProductsByCategory,
  getBestProducts,
  getFeatureProducts,
} = require("../controllers/ProductController")
const upload = require("../utils/multer")

router.post("/add", upload.single("url"), addOrEditProduct)
router.get("/", getProducts)
router.get("/best-deals", getBestProducts)
router.get("/fearture-deals", getFeatureProducts)
router.get("/get-category-products/:productId", getProductsByCategory)
router.delete("/:id", removeProduct)
router.get("/:id", getProduct)

router.put("/update/:id", updateProduct)

module.exports = router
