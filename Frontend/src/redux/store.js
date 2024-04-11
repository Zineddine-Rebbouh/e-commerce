import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { wishlistReducer } from "./reducers/wishlist";
import { cartReducer } from "./reducers/cart";
import { shopReducer } from "./reducers/shop";
import { orderReducer } from "./reducers/order";

const Store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    shop: shopReducer,
    order: orderReducer,
  },
});

export default Store;
