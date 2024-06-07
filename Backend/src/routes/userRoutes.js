const express = require("express")
const router = express.Router()
const {
  getUser,
  getCurrentUserUser,
  getUsers,
  deleteUser,
  addToCart,
  addWhislist,
  getUserCartItems,
  refundOrder,
  getUserWhilistItems,
  removeFromWhislist,
  removeFromCart,
  updateUserInformation,
} = require("../controllers/userController")
const upload = require("../utils/multer")
const { validateToken } = require("../middelware/validateToken")
const { Checkout } = require("../controllers/CheckoutController")

router.get("/", validateToken, getUsers)
router.get("/currentUser", validateToken, getCurrentUserUser)
router.put(
  "/profile",
  upload.single("avatar"),
  validateToken,
  updateUserInformation
)

router.get("/cart", validateToken, getUserCartItems)
router.get("/whislist", validateToken, getUserWhilistItems)
router.post("/checkout", validateToken, Checkout)

router.put("/add-to-cart", validateToken, addToCart)
router.delete("/remove-from-cart/:id", validateToken, removeFromCart)

// router.get("/whi", validateToken, getUserCartItems)
router.put("/add-to-whislist", validateToken, addWhislist)
router.delete("/remove-from-whislist/:id", validateToken, removeFromWhislist)

// refund and transection
router.post("/refund", validateToken, refundOrder)

//delete user
router.delete("/", validateToken, deleteUser)
router.get("/:id", validateToken, getUser)

module.exports = router
