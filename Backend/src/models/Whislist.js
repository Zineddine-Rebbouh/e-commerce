const mongoose = require("mongoose")

const whislistSchema = new mongoose.Schema({
  userId: {
    type: String,

    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  w,
})

module.exports = mongoose.model("Whislist", whislistSchema)
