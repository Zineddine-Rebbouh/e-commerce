const LineOrderItems = require("../models/LineOrderItems")
const Order = require("../models/Order")

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({
        createdAt: -1,
      })
      .populate("userId", "name email")
    console.log(orders)
    res.status(200).json({ orders })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("shippingAddress")

    if (!order) {
      return next(new ErrorHandler("Order not found", 404))
    }

    const items = await LineOrderItems.find({
      orderId: order._id,
    }).populate("productId")

    const productInfos = items.map(item => ({
      ...item.productId,
      quantity: item.quantity,
    }))

    const orderWithProductInfos = { ...order.toObject(), items: productInfos }
    console.log(orderWithProductInfos)
    res.status(200).json(orderWithProductInfos)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
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

    if (!orders) {
      return res.status(404).json([])
    }

    for (let i = 0; i < orders.length; i++) {
      const items = await LineOrderItems.find({ orderId: orders[i]._id })

      const productInfos = items.map(item => ({
        ...item.productId,
      }))

      // Extracting productIds into an array
      const productIds = items.map(item => item.productId._id)

      // Adding productIds array to each order object
      orders[i] = {
        ...orders[i].toObject(),
        items: productInfos,
        productIds: productIds,
      }
    }

    console.log(orders)

    res.status(200).json(orders)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    order.status = status
    await order.save()

    res.status(200).json({ message: "Order status updated successfully" })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { getOrders, getOrder, getOrderByUserId, updateOrderStatus }
