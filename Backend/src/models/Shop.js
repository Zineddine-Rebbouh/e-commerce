const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your shop name!"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your shop email address"],
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  Balance: {
    type: Number,
    default: 0,
  },
  transections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

// jwt token
// shopSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   })
// }

module.exports = mongoose.model("Shop", shopSchema)
