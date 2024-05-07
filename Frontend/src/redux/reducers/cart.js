import { createReducer } from "@reduxjs/toolkit"
import * as apiClient from "../../api/api-Client"

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
}

export const cartReducer = createReducer(initialState, builder => {
  // Add cases to handle different actions
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload
      const isItemExistIndex = state.cart.findIndex(i => i._id === item._id)
      if (isItemExistIndex !== -1) {
        state.cart[isItemExistIndex] = item // Update existing item in cart
      } else {
        state.cart.push(item) // Add new item to cart
      }

      // Update local storage with updated cart items
      localStorage.setItem("cartItems", JSON.stringify(state.cart))
    })
    .addCase("updateCart", (state, action) => {
      const updatedCart = action.payload
      state.cart = updatedCart // Replace entire cart with updated cart items
      localStorage.setItem("cartItems", JSON.stringify(state.cart))
    })
    .addCase("removeFromCart", (state, action) => {
      // Remove item from cart based on its id
      const itemIdToRemove = action.payload
      state.cart = state.cart.filter(item => item._id !== itemIdToRemove)

      localStorage.setItem("cartItems", JSON.stringify(state.cart))
    })
    .addCase("clearCart", state => {
      // Clear the cart
      state.cart = []

      localStorage.removeItem("cartItems")
    })
})
