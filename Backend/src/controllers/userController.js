const User = require("../models/User")
const Shop = require("../models/Shop")
const Cart = require("../models/Cart")
const LineItems = require("../models/LineOrderItems")

const getCurrentUserUser = async (req, res) => {
  let shop
  try {
    const user = await User.findById(req.userId).select("-password")

    if (user.shopId) {
      shop = await Shop.findOne({ _id: user.shopId })
      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists", 400))
      }
    }

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400))
    }

    user.shop = shop

    res.status(200).json({ user: user })
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

const getUser = async (req, res) => {
  let shop
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("shopId")

    // if (user.shopId) {
    //   shop = await Shop.findOne({ _id: user.shopId })
    //   if (!shop) {
    //     return next(new ErrorHandler("Shop doesn't exists", 400))
    //   }
    // }

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400))
    }

    res.status(200).json({ user: user })
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["Customer", "Seller"] } })
      .select("-password")
      .sort({ createdAt: -1 })
    res.status(200).json({ users })
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User deleted")
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body

    const product = {
      productId,
      quantity,
    }

    const item = await LineItems.create(product)

    await Cart.create({
      userId: req.userId,
      LineItemsId: item._id,
    })

    res.status(200).json("Product added to cart")
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
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

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body

    await Cart.findOneAndDelete({
      userId: req.userId,
      "products.productId": productId,
    })

    res.status(200).json("Product removed from cart")
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

const removeFromWhislist = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    const { productId } = req.body

    user.whislist = user.whislist.filter(id => id !== productId)

    await user.save()

    res.status(200).json("Product removed from whislist")
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

module.exports = {
  getUser,
  getUsers,
  getCurrentUserUser,
  deleteUser,
  addToCart,
  addWhislist,
  removeFromCart,
  removeFromWhislist,
}
