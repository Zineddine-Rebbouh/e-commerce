const mongoose = require("mongoose")

const LineItemsSchema = new mongoose.Schema({
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

const LineItems = mongoose.model("LineItems", LineItemsSchema)

module.exports = LineItems
