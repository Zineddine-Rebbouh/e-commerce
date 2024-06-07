export const register = async formData => {
  const response = await fetch("http://localhost:8000/api/auth/register", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getNotifications = async () => {
  const response = await fetch("http://localhost:8000/api/notifications", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch notifications")
  }

  const responseBody = await response.json()
  console.log(responseBody)
  return responseBody
}

export const addCategory = async (id, data) => {
  const response = await fetch(
    `http://localhost:8000/api/categories/add/${id}`,
    {
      method: "POST",
      credentials: "include", // Remove the trailing space
      body: data,
    }
  )

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const Login = async formData => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getReports = async () => {
  const response = await fetch("http://localhost:8000/api/reports", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch reports")
  }

  const responseBody = await response.json()
  console.log(responseBody)
  return responseBody
}

export const createRequestShop = async formData => {
  const response = await fetch(
    "http://localhost:8000/api/shop/create-request-shop",
    {
      method: "POST",
      credentials: "include",
      body: formData, // Pass the FormData object directly
    }
  )

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const createShop = async formData => {
  const response = await fetch("http://localhost:8000/api/shop/create-shop", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getShop = async shopId => {
  console.log(shopId)
  const response = await fetch("http://localhost:8000/api/shop/" + shopId, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getUsers = async () => {
  const response = await fetch("http://localhost:8000/api/user", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const removeProduct = async productId => {
  const response = await fetch(
    "http://localhost:8000/api/products/" + productId,
    {
      method: "DELETE",
      credentials: "include",
    }
  )
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  console.log("Product deleted")
}

export const getUser = async userId => {
  const response = await fetch("http://localhost:8000/api/user/" + userId, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const removeUser = async userId => {
  const response = await fetch("http://localhost:8000/api/user/" + userId, {
    method: "DELETE",
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  console.log("User deleted")
}

export const getProdutcts = async () => {
  const response = await fetch("http://localhost:8000/api/products", {
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  ad
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getProductByCategory = async productId => {
  const response = await fetch(
    `http://localhost:8000/api/products/get-category-products/${productId} `,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const checkout = async (cartItems, customer) => {
  console.log("here" + cartItems)
  const response = await fetch("http://localhost:8000/api/user/checkout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartItems, customer }),
  })
  const responseBody = await response.json()
  console.log(responseBody)
  if (!response.ok) {
    throw new Error(responseBody.message)
  }

  return responseBody
}

export const deleteUserAccount = async userId => {
  const response = await fetch("http://localhost:8000/api/user/" + userId, {
    method: "DELETE",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to delete user")
  }
}

export const deleteCurrentUserAccount = async () => {
  const response = await fetch("http://localhost:8000/api/user", {
    method: "DELETE",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to delete user")
  }
}

export const getOrdersByUserId = async userId => {
  console.log("here orders")
  const response = await fetch(
    "http://localhost:8000/api/order/get-customer-orders/" + userId,
    {
      method: "GET",
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const logout = async () => {
  const response = await fetch("http://localhost:8000/api/auth/logout", {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Logout failed")
  }
}

export const createReport = async formData => {
  console.log(formData)
  const response = await fetch("http://localhost:8000/api/reports/", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }

  const responseBody = await response.json()
  console.log(responseBody)
}

export const getProducts = async () => {
  const response = await fetch("http://localhost:8000/api/products")

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getBestProducts = async () => {
  const response = await fetch("http://localhost:8000/api/products/best-deals")

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getFeatureProducts = async () => {
  const response = await fetch(
    "http://localhost:8000/api/products/fearture-deals"
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getProduct = async productId => {
  console.log("here")
  const response = await fetch(
    "http://localhost:8000/api/products/" + productId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getProdutctsByShopId = async shopId => {
  const response = await fetch(
    "http://localhost:8000/api/shop/products/" + shopId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getOrders = async () => {
  const response = await fetch("http://localhost:8000/api/order", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getRequestsShop = async () => {
  const response = await fetch("http://localhost:8000/api/shop/shop-requests", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getOrder = async orderId => {
  const response = await fetch("http://localhost:8000/api/order/" + orderId, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch order")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getShopOrders = async shopId => {
  const response = await fetch(
    "http://localhost:8000/api/order/get-seller-all-orders/" + shopId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const createProduct = async formData => {
  const response = await fetch("http://localhost:8000/api/product/create", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })
  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const createOrder = async formData => {
  const response = await fetch("http://localhost:8000/api/order/create", {
    method: "POST",

    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const updateOrder = async (orderId, formData) => {
  const response = await fetch("http://localhost:8000/api/order/" + orderId, {
    method: "PUT",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const deleteOrder = async orderId => {
  const response = await fetch("http://localhost:8000/api/order/" + orderId, {
    method: "DELETE",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const updateProduct = async (productId, formData) => {
  const response = await fetch(
    "http://localhost:8000/api/product/" + productId,
    {
      method: "PUT",
      credentials: "include",
      body: formData, // Pass the FormData object directly
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const deleteProduct = async productId => {
  const response = await fetch(
    "http://localhost:8000/api/products/" + productId,
    {
      method: "delete",
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const getShopProducts = async shopId => {
  const response = await fetch(
    "http://localhost:8000/api/product/get-seller-products/" + shopId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getShopOrdersByShopId = async shopId => {
  const response = await fetch(
    "http://localhost:8000/api/shop/orders/" + shopId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(
    "http://localhost:8000/api/order/update-status/" + orderId,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const updateShop = async (shopId, formData) => {
  const response = await fetch("http://localhost:8000/api/shop/" + shopId, {
    method: "PUT",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const deleteShop = async shopId => {
  const response = await fetch("http://localhost:8000/api/shop/" + shopId, {
    method: "DELETE",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const createReview = async (productId, data) => {
  console.log(data)
  const response = await fetch(
    "http://localhost:8000/api/review/660b33a59cc01fa8dd32a28a",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Corrected headers object
      },
      body: JSON.stringify(data), // Convert data to JSON string
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const getReviews = async id => {
  const response = await fetch("http://localhost:8000/api/review/" + id, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getReview = async reviewId => {
  const response = await fetch("http://localhost:8000/api/review/" + reviewId, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const updateReview = async (reviewId, formData) => {
  const response = await fetch("http://localhost:8000/api/review/" + reviewId, {
    method: "PUT",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const deleteReview = async reviewId => {
  const response = await fetch("http://localhost:8000/api/review/" + reviewId, {
    method: "DELETE",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const getReviewsByProductId = async productId => {
  const response = await fetch(
    "http://localhost:8000/api/review/get-product-reviews/" + productId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getReviewsByShopId = async shopId => {
  const response = await fetch(
    "http://localhost:8000/api/review/get-seller-reviews/" + shopId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const getReviewsByUserId = async userId => {
  const response = await fetch(
    "http://localhost:8000/api/review/get-customer-reviews/" + userId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const createCart = async formData => {
  const response = await fetch("http://localhost:8000/api/cart/create", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const getCart = async cartId => {
  const response = await fetch("http://localhost:8000/api/cart/" + cartId, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const updateCart = async formData => {
  const response = await fetch("http://localhost:8000/api/user/add-to-cart", {
    method: "PUT",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const saveCartItemsToBackend = async cartItems => {
  const response = await fetch("http://localhost:8000/api/user/add-to-cart", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartItems),
  })

  if (!response.ok) {
    throw new Error("Failed to save cart items")
  }
}

export const saveWishlistItemsToBackend = async wishlistItems => {
  const response = await fetch(
    "http://localhost:8000/api/user/add-to-whislist",
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wishlistItems),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to save wishlist items")
  }
}

export const getUserCartItems = async () => {
  const response = await fetch("http://localhost:8000/api/user/cart", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch cart items")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}
// export const deleteCart = async cartId => {
//   const response = await fetch("http://localhost:8000/api/cart/" + cartId, {
//     method: "DELETE",
//     credentials: "include",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to fetch orders")
//   }
// }

export const getUserWhilistItems = async () => {
  const response = await fetch("http://localhost:8000/api/user/whislist", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch cart items")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const removeFromWishlist = async id => {
  const response = await fetch(
    `http://localhost:8000/api/user/remove-from-whislist/${id}`,
    {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  if (!response.ok) {
    throw new Error("Failed to dekete item from whilist items")
  }
}

export const deleteCart = async cartId => {
  const response = await fetch("http://localhost:8000/api/cart/" + cartId, {
    method: "DELETE",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const getCartByUserId = async userId => {
  const response = await fetch(
    "http://localhost:8000/api/cart/get-customer-cart/" + userId,
    {
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const createCartItem = async formData => {
  const response = await fetch("http://localhost:8000/api/cartItem/create", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const updateCartItem = async (cartItemId, formData) => {
  const response = await fetch(
    "http://localhost:8000/api/cartItem/" + cartItemId,
    {
      method: "PUT",
      credentials: "include",
      body: formData, // Pass the FormData object directly
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const deleteCartItem = async cartItemId => {
  const response = await fetch(
    "http://localhost:8000/api/cartItem/" + cartItemId,
    {
      method: "DELETE",
      credentials: "include",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch orders")
  }
}

export const addProdcut = async (formData, userId) => {
  const response = await fetch("http://localhost:8000/api/products/add/", {
    method: "POST",
    credentials: "include",
    body: formData, // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getCateogries = async () => {
  const response = await fetch("http://localhost:8000/api/categories", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const addRating = async data => {
  console.log(data)
  console.log("reached")
  const response = await fetch("http://localhost:8000/api/review/" + data.id, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data), // Pass the FormData object directly
    headers: {
      "Content-Type": "application/json",
    },
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getShops = async () => {
  const response = await fetch("http://localhost:8000/api/shop", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch shops")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

const addWhislist = async (req, res) => {
  try {
    const { productId } = req.body

    await Whislist.create({
      userId: req.userId,
      products: [{ productId }],
    })

    res.status(200).json("Product added to whislist")
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

export const addToCart = async formData => {
  const response = await fetch("http://localhost:8000/api/user/add-to-cart", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Pass the FormData object directly
  })

  const responseBody = await response.json()
  console.log(response)

  if (!response.ok) {
    throw new Error(responseBody.message)
  }

  return responseBody
}

export const removeFromCart = async id => {
  const response = await fetch(
    "http://localhost:8000/api/user/remove-from-cart/" + id,
    {
      method: "delete",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getCartItems = async () => {
  const response = await fetch("http://localhost:8000/api/cartItem", {
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch cart items")
  }
  const responseBody = await response.json()
  console.log(responseBody)

  return responseBody
}

export const refundOrder = async orderId => {
  const response = await fetch("http://localhost:8000/api/user/refund", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId }),
  })

  if (!response.ok) {
    throw new Error(responseBody.message)
  }

  return response
}
