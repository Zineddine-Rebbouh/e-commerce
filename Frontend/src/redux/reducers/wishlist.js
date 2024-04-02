import { createReducer } from "@reduxjs/toolkit"

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
}

export const wishlistReducer = createReducer(initialState, builder => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload
      const isItemExist = state.wishlist.find(i => i.id === item.id)
      if (isItemExist) {
        // Instead of returning a new state, directly modify the draft state provided by Immer
        state.wishlist = state.wishlist.map(i =>
          i.id === isItemExist.id ? item : i
        )
      } else {
        state.wishlist.push(item) // Directly modify the array by pushing the new item
      }
    })
    .addCase("removeFromWishlist", (state, action) => {
      state.wishlist = state.wishlist.filter(i => i.id !== action.payload) // Directly modify the draft state
    })
})
