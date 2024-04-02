import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/user"
import { wishlistReducer } from "./reducers/wishlist"
import { cartReducer } from "./reducers/cart"

const Store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
})

export default Store
