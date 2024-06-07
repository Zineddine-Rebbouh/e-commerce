const mongoose = require("mongoose")

const LineOrderItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
})

const LineOrderItems = mongoose.model("LineOrderItems", LineOrderItemsSchema)

module.exports = LineOrderItems
