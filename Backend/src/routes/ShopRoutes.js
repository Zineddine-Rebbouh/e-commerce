const router = require("express").Router()

const {
  createShop,
  getShops,
  getShop,
  updateShop,
  deleteShop,
} = require("../controllers/ShopController")
const upload = require("../utils/multer")

router.post("/create", upload.single("avatar"), createShop)
router.get("/", getShops)
router.get("/:id", getShop)
router.put("/:id", updateShop)
router.delete("/:id", deleteShop)

module.exports = router
