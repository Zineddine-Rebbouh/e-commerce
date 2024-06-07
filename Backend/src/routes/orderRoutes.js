const {
  getOrder,
  getOrders,
  getOrderByUserId,
  updateOrderStatus,
} = require("../controllers/OrderController")

const router = require("express").Router()

router.get("/", getOrders)
router.get("/:id", getOrder)
router.put("/update-status/:id", updateOrderStatus)

router.get("/get-customer-orders/:id", getOrderByUserId)

module.exports = router
