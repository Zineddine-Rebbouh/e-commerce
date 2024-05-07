const {
  getOrder,
  getOrders,
  getOrderByUserId,
} = require("../controllers/OrderController")

const router = require("express").Router()

router.get("/", getOrders)

router.get("/get-customer-orders/:id", getOrderByUserId)

router.get("/:id", getOrder)

module.exports = router
