const router = require("express").Router()
const Review = require("../models/Review")
const Product = require("../models/Product")
const { validateToken } = require("../middelware/validateToken")
const { createReview } = require("../controllers/reviewController")

router.post("/:id", validateToken, createReview)

module.exports = router
