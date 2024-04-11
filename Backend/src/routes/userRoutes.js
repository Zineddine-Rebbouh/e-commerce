const express = require("express")
const router = express.Router()
const {
  getUser,
  getCurrentUserUser,
  getUsers,
  deleteUser,
} = require("../controllers/userController")
const { validateToken } = require("../middelware/validateToken")
const { Checkout } = require("../controllers/CheckoutController")

router.get("/", validateToken, getUsers)
router.get("/currentUser", validateToken, getCurrentUserUser)
router.get("/:id", validateToken, getUser)

router.post("/checkout", validateToken, Checkout)
//delete user
router.delete("/:id", validateToken, deleteUser)

module.exports = router
