const Order = require("../models/Order")

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    })
    console.log(orders)
    res.status(200).json({ orders })
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return next(new ErrorHandler("Order not found", 404))
    }

    res.status(200).json({ order })
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

const getOrderByUserId = async (req, res) => {
  console.log("orders")
  try {
    const orders = await Order.find({ userId: req.params.id })
      .sort({
        createdAt: -1,
      })
      .populate("userId", "name email")

    console.log(orders)

    res.status(200).json(orders)
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

module.exports = { getOrders, getOrder, getOrderByUserId }
