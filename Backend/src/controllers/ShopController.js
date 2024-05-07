const LineItems = require("../models/LineOrderItems")
const Order = require("../models/Order")
const Shop = require("../models/Shop")
const User = require("../models/User")
const uploadImage = require("../utils/uploadImage")

const createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body)

    if (req.file) {
      shop.avatar = await uploadImage(req.file)
    }

    await shop.save()
    const user = await User.findById(req.body.userId)
    user.role = "Seller"
    user.shopId = shop._id
    await user.save()
    res.status(201).json(shop)
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating shop", error: error.message })
  }
}

const getShops = async (req, res) => {
  try {
    const shops = await Shop.find()
    res.status(200).json(shops)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting shops", error: error.message })
  }
}

const getShop = async (req, res) => {
  try {
    console.log(req.params.id)
    const shop = await Shop.findById(req.params.id)
    console.log(shop)
    if (shop) {
      return res.status(200).json(shop)
    } else {
      res.status(404).json({ message: "Shop not found" })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting shop", error: error.message })
  }
}

const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
    if (shop) {
      shop.name = req.body.name || shop.name
      shop.description = req.body.description || shop.description
      shop.image = req.body.image || shop.image
      shop.price = req.body.price || shop.price
      shop.category = req.body.category || shop.category
      shop.countInStock = req.body.countInStock || shop.countInStock
      const updatedShop = await shop.save()
      res.json(updatedShop)
    } else {
      res.status(404).json({ message: "Shop not found" })
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating shop", error: error.message })
  }
}

const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
    if (shop) {
      await shop.remove()
      res.json({ message: "Shop removed" })
    } else {
      res.status(404).json({ message: "Shop not found" })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting shop", error: error.message })
  }
}

const getShopProducts = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
    if (shop) {
      const products = await shop.getProducts()
      res.json(products)
    } else {
      res.status(404).json({ message: "Shop not found" })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting shop products", error: error.message })
  }
}

const getShopOrders = async (req, res) => {
  try {
    const shopId = req.params.id

    // Populate the productId field to get associated product data, including shopId
    const orders = await LineItems.find()
      .populate("productId")
      .populate("orderId")

    // Filter orders based on shopId
    const shopOrders = orders.filter(order => order.productId.shopId == shopId)

    // Group items by orderId
    const ordersWithItems = {}
    shopOrders.forEach(order => {
      const orderId = order.orderId
      if (!ordersWithItems[orderId]) {
        ordersWithItems[orderId] = { ...order.toObject(), items: [] }
      }
      ordersWithItems[orderId].items.push(order.productId.toObject())
      delete ordersWithItems[orderId].productId // Remove productId field
    })

    const ordersArray = Object.values(ordersWithItems)

    console.log(ordersArray)

    res.status(200).json(ordersArray)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting shop orders", error: error.message })
  }
}

module.exports = {
  createShop,
  getShops,
  getShop,
  updateShop,
  deleteShop,
  getShopProducts,
  getShopOrders,
}
