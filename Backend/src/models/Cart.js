const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  LineCartItemsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LineCartItems",
  },
})

module.exports = mongoose.model("Cart", cartSchema)
