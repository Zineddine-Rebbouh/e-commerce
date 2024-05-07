const router = require("express").Router()
const { body } = require("express-validator")

const {
  AddProduct,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
  getProductsByCategory,
} = require("../controllers/ProductController")
const upload = require("../utils/multer")

router.post(
  "/add",
  upload.single("url"),
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").notEmpty().withMessage("Price is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("discount").notEmpty().withMessage("Discount is required"),
  ],
  AddProduct
)
router.get("/", getProducts)
router.get(
  "/get-category-products/:categoryId/:productId",
  getProductsByCategory
)
router.delete("/remove/:id", removeProduct)
router.get("/:id", getProduct)

router.put("/update/:id", updateProduct)

module.exports = router
