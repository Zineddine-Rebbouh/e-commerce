const User = require("../models/User")
const Shop = require("../models/Shop")

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

module.exports = { getUser, getUsers, getCurrentUserUser, deleteUser }
