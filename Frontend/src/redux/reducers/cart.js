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
    .addCase("mergeCartItems", (state, action) => {
      const newCartItems = action.payload
      newCartItems.forEach(item => {
        const isItemExistIndex = state.cart.findIndex(i => i._id === item._id)
        if (isItemExistIndex !== -1) {
          state.cart[isItemExistIndex] = item // Update existing item in cart
        } else {
          state.cart.push(item) // Add new item to cart
        }
      })

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
      console.log("clear cart")

      state.cart = []

      localStorage.setItem("cartItems", [])
    })
    .addCase("transferCartToBackend", async (state, action) => {
      try {
        // Send request to backend to save cart items associated with the user
        await apiClient.saveCartItemsToBackend(getState().cart.cart)

        // Optionally, you can handle success actions or update state based on the response
      } catch (error) {
        // Handle error, such as displaying an error message to the user
        console.error("Error saving cart items to backend:", error)
        // Optionally, dispatch an action to handle error states
      }
    })
    .addCase("fetchCartItemsRequest", state => {
      state.loading = true
      state.error = null
    })
    .addCase("fetchCartItemsSuccess", (state, action) => {
      state.cart = action.payload
      state.loading = false
      localStorage.setItem("cartItems", JSON.stringify(state.cart))
    })
    .addCase("fetchCartItemsFailure", (state, action) => {
      state.loading = false
      state.error = action.payload
    })
})
