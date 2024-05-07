const Review = require("../models/Review")
const Product = require("../models/Product")

// @desc    Create new review

const createReview = async (req, res) => {
  const { rating, comment } = req.body

  const { id } = req.params

  try {
    const product = await Product.findById(id)

    if (product) {
      // productId saved in reviews schema so you need to search in side the reviews array

      console.log(req.userId)
      const review = new Review({
        rating: rating,
        comment,
        productId: id,
        userId: req.userId,
      })

      await review.save()
      res.status(201).json({ message: "Review added" })
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getReviews = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    if (product) {
      const reviews = await Review.find({ productId: id }).populate("userId")
      res.status(201).json(reviews)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteReview = async (req, res) => {
  const { id } = req.params

  try {
    const review = await Review.findById(id).populate("productId")

    if (review) {
      await review.remove()
      res.status(201).json({ message: "Review deleted" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateReview = async (req, res) => {
  const { id } = req.params
  const { rating, comment } = req.body

  try {
    const review = await Review.findById(id).populate("productId")

    if (review) {
      review.rating = rating
      review.comment = comment

      await review.save()
      res.status(201).json({ message: "Review updated" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createReview, getReviews, deleteReview, updateReview }
