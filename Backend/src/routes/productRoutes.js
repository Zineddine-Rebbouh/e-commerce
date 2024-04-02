const router = require("express").Router()

const {
  AddProduct,
  getProducts,
  removeProduct,
  getProduct,
  updateProduct,
} = require("../controllers/ProductController")
const upload = require("../utils/multer")

router.post("/add", upload.single("url"), AddProduct)
router.get("/", getProducts)
router.delete("/remove/:id", removeProduct)
router.get("/:id", getProduct)

router.put("/update/:id", updateProduct)

module.exports = router
