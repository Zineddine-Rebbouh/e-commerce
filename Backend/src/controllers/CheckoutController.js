const express = require("express");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// POST endpoint handler
const Checkout = async (req, res) => {
  try {
    const { cartItems } = req.body;
    if (!cartItems) {
      return res.status(400).send("Not enough data to checkout");
    }

    console.log(cartItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["DZ"],
      },
      shipping_options: [
        { shipping_rate: "shr_1P1XrrACnMCxOPfXhRZyWBUl" },
        { shipping_rate: "shr_1P1XszACnMCxOPfXGGoiZvPJ" },
      ],
      line_items: cartItems.map((cartItem) => ({
        price_data: {
          currency: "DZD",
          product_data: {
            name: cartItem.name,
            metadata: {
              productId: cartItem.id,
              description: cartItem.description,
              url: cartItem.image_Url.url,
              // ...(cartItem.description && {
              //   description: cartItem.description,
              // }),
              // ...(cartItem.image_Url.url && { url: cartItem.image_Url.url }),
            },
          },
          unit_amount: cartItem.price * 100,
        },
        quantity: cartItem.stock,
      })),
      client_reference_id: req.userId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cancel`,
    });
    console.log(session);
    res.status(200).json(session);
  } catch (err) {
    console.log("here erreur : ");
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { Checkout };
