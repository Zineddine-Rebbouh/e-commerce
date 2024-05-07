const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  LineItemsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LineItems",
    required: true,
  },
})

module.exports = mongoose.model("Cart", cartSchema)
