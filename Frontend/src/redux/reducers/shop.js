import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadShopDetails", (state) => {
      state.isLoading = true;
    })
    .addCase("getShopDetailsSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.shop = action.payload;
    })
    .addCase("getShopDetailsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.shop = null;
    });
});
