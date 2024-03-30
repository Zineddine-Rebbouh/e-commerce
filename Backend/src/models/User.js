const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    role: {
      type: String,
      required: false,
      enum: ["Admin", "Customer", "Seller"],
      default: "Customer",
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
