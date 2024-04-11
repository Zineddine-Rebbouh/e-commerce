const Review = require("../models/Review")
const Product = require("../models/Product")

// @desc    Create new review

const createReview = async (req, res) => {
  const { rating, comment } = req.body

  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      // const alreadyReviewed = product.Reviews.find(
      //   r => r.userId.toString() === req.userId.toString()
      // )

      // if (alreadyReviewed) {
      //   res.status(400)
      //   throw new Error("Product already reviewed")
      // }

      const review = new Review({
        rating: Number(rating),
        comment,
        productId: req.params.id,
        userId: req.userId,
      })

      product.Reviews.push(review)

      await review.save()
      await product.save()
      res.status(201).json({ message: "Review added" })
    } else {
      res.status(404)
      throw new Error("Product not found")
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createReview }
