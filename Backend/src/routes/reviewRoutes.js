const router = require("express").Router()
const Review = require("../models/Review")
const Product = require("../models/Product")
const { validateToken } = require("../middelware/validateToken")
const {
  createReview,
  getReviews,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController")

router.post("/:id", validateToken, createReview)

router.get("/:id", validateToken, getReviews)

router.delete("/:id", validateToken, deleteReview)

router.put("/:id", validateToken, updateReview)

module.exports = router
