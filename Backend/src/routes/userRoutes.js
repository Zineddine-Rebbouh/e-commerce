const express = require("express")
const router = express.Router()
const {
  getUser,
  getCurrentUserUser,
  getUsers,
  deleteUser,
  addToCart,
  addWhislist,
} = require("../controllers/userController")
const { validateToken } = require("../middelware/validateToken")
const { Checkout } = require("../controllers/CheckoutController")

router.get("/", validateToken, getUsers)
router.get("/currentUser", validateToken, getCurrentUserUser)
router.get("/:id", validateToken, getUser)

router.post("/checkout", validateToken, Checkout)

router.post("/add-to-cart", validateToken, addToCart)
router.post("/add-to-whislist", validateToken, addWhislist)
//delete user
router.delete("/:id", validateToken, deleteUser)

module.exports = router
