const router = require("express").Router()

const {
  createShop,
  getShops,
  getShop,
  updateShop,
  deleteShop,
  getShopProducts,
  getShopOrders,
  createRequestShop,
  getRequestsShop,
  approveRequest,
  rejectRequest,
} = require("../controllers/ShopController")
const { validateToken } = require("../middelware/validateToken")
const upload = require("../utils/multer")

router.post(
  "/create-request-shop",
  validateToken,
  upload.single("avatar"),
  createRequestShop
)

router.post("/create-shop/:id", validateToken, createShop)
router.put("/approve-shop/:id", validateToken, approveRequest)
router.put("/reject-shop/:id", validateToken, rejectRequest)
router.get("/", getShops)
router.get("/shop-requests", getRequestsShop)
router.get("/:id", getShop)
router.put("/:id", upload.single("avatar"), validateToken, updateShop)
router.delete("/:id", deleteShop)
router.get("/products/:id", getShopProducts)
router.get("/orders/:id", validateToken, getShopOrders)

module.exports = router
