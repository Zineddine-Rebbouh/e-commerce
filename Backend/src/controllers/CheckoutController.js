const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Cart = require("../models/Cart")

// POST endpoint handler
const Checkout = async (req, res) => {
  try {
    console.log("chechout controller1")
    const { cartItems } = req.body

    console.log(cartItems)
    if (!cartItems) {
      return res.status(400).send("Not enough data to checkout")
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"], // Update allowed countries if necessary
      },
      shipping_options: [
        { shipping_rate: "shr_1PCoo5ACnMCxOPfXgUqXuG5p" },
        { shipping_rate: "shr_1PConWACnMCxOPfXIBHsJON5" },
      ],
      line_items: cartItems.map(cartItem => ({
        price_data: {
          currency: "USD", // Change currency to USD
          product_data: {
            name: cartItem.name,
            metadata: {
              productId: cartItem._id,
              description: truncateDescription(cartItem.description), // Truncate description
              url: cartItem.image.url,
              shopId: cartItem.shopId._id,
            },
          },
          unit_amount: cartItem.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: req.userId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cancel`,
    })

    //clear user cart

    await Cart.findOneAndDelete({ userId: req.userId })

    res.status(200).json(session)
  } catch (err) {
    console.error("Error during checkout:", err)
    res.status(500).send("Internal Server Error")
  }
}

// Function to truncate description if it exceeds 500 characters
const truncateDescription = description => {
  const maxLength = 500
  return description.length > maxLength
    ? description.slice(0, maxLength)
    : description
}

module.exports = { Checkout }
