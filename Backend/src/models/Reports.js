const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
  reportedUserId: {
    type: String,
    required: true,
  },
  reporterUserId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Report", reportSchema)
