const LineOrderItems = require("../models/LineOrderItems")
const Order = require("../models/Order")
const RequestShopDetails = require("../models/RequestShopDetails")
const Requests = require("../models/Requests")
const Shop = require("../models/Shop")
const User = require("../models/User")
const uploadImage = require("../utils/uploadImage")
const Product = require("../models/Product")
const nodemailer = require("nodemailer")

const createRequestShop = async (req, res) => {
  const { name, phoneNumber, email, description, address, zipCode } = req.body

  const ShopDetails = new RequestShopDetails({
    name,
    phoneNumber: phoneNumber,
    email,
    description,
    address,
    zipCode: parseInt(zipCode),
  })

  if (req.file) {
    ShopDetails.avatar = await uploadImage(req.file)
  }

  await ShopDetails.save()

  try {
    const request = new Requests({
      userId: req.userId,
      requestDetails: ShopDetails._id,
    })
    await request.save()
    res.status(201).json(request)
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ message: "Error creating request", error: error.message })
  }
}

const createShop = async (req, res) => {
  console.log("create shop")
  const request = await Requests.findById(req.params.id).populate(
    "requestDetails"
  )

  if (!request) {
    return res.status(404).json({ message: "Request not found" })
  }

  request.requestStatus = "Approved"
  await request.save()

  console.log(request)

  if (!request) {
    return res.status(404).json({ message: "Request not found" })
  }

  try {
    const shop = new Shop({
      name: request.requestDetails.name,
      phoneNumber: request.requestDetails.phoneNumber,
      email: request.requestDetails.email,
      description: request.requestDetails.description,
      address: request.requestDetails.address,
      zipCode: request.requestDetails.zipCode,
      userId: request.userId.toString(),
      avatar: request.requestDetails.avatar,
    })

    await shop.save()
    const user = await User.findById(request.userId.toString())
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

const getRequestsShop = async (req, res) => {
  try {
    const requests = await Requests.find({ requestStatus: "Pending" })
      .populate("requestDetails")
      .populate("userId")
      .exec()
    res.status(200).json(requests)
  } catch (error) {
    res

      .status(500)
      .json({ message: "Error getting requests", error: error.message })
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
    shop.views += 1
    await shop.save()
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
    console.log("req.body update")
    console.log(req.body)
    const shop = await Shop.findById(req.params.id)
    if (shop) {
      shop.name = req.body.name || shop.name
      shop.description = req.body.description || shop.description
      shop.email = req.body.email || shop.image
      shop.phoneNumber = req.body.phoneNumber || shop.phoneNumber
      shop.address = req.body.address || shop.address

      if (req.file) {
        shop.avatar = await uploadImage(req.file)
      }

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

    const user = await User.findOne({ shopId: req.params.id })
    if (user) {
      user.role = "Customer"
      user.shopId = null
      await user.save()
    }

    await Product.deleteMany({ shopId: req.params.id })

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
      const products = await Product.find({ shopId: shop._id }).populate(
        "categoryId"
      )
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

    // Find all users with the given shopId
    const user = await User.findOne({ shopId: shopId })

    if (!user) {
      return res.status(404).json({ message: "No users found for this shop" })
    }

    console.log(user)
    // Extract user IDs

    // Find all orders by these users
    const orders = await Order.find({ userId: user._id })

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this shop" })
    }
    console.log(orders)
    // Extract order IDs
    const orderIds = orders.map(order => order._id)

    console.log(orderIds)
    // Find all LineOrderItems by these orders and populate necessary fields
    const lineOrderItems = await LineOrderItems.find({
      orderId: { $in: orderIds },
    })
      .populate("productId")
      .populate({
        path: "orderId",
        populate: {
          path: "userId",
          select: "name email", // Select only required fields
        },
      })

    console.log(lineOrderItems)

    // Group items by orderId
    const ordersWithItems = {}
    lineOrderItems.forEach(item => {
      const orderId = item.orderId._id
      if (!ordersWithItems[orderId]) {
        ordersWithItems[orderId] = { ...item.orderId.toObject(), items: [] }
      }
      ordersWithItems[orderId].items.push(item.productId.toObject())
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

const approveRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id)
    if (request) {
      request.requestStatus = "Approved"
      await request.save()
      res.json(request)
    } else {
      res.status(404).json({ message: "Request not found" })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error approving request", error: error.message })
  }
}

const rejectRequest = async (req, res) => {
  try {
    const { reason } = req.body
    const requestId = req.params.id

    // Find the request and populate the user
    const request = await Requests.findById(requestId).populate("userId")

    if (request) {
      // Update the request status to "Rejected"
      request.requestStatus = "Rejected"
      await request.save()

      // Send email to the user
      const transporter = nodemailer.createTransport({
        // Configure your email service here
        host: "smtp.gmail.com",
        port: 465,
        service: "Gmail",
        secure: true,
        auth: {
          user: "zinedinerabouh@gmail.com", // your email
          pass: "jnxa cgzd bade bjbc", // your password
        },
      })

      const mailOptions = {
        from: "zinedinerabouh@gmail.com",
        to: request.userId.email, // recipient's email
        subject: "Your request has been rejected",
        text: `Dear ${request.userId.name},\n\nYour request has been rejected. Reason: ${reason}\n\nRegards,\nAdmin`,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
          res.status(500).json({ message: "Error sending email" })
        } else {
          console.log("Email sent: " + info.response)
        }
      })

      res.json(request)
    } else {
      res.status(404).json({ message: "Request not found" })
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error rejecting request", error: error.message })
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
  getRequestsShop,
  createRequestShop,
  approveRequest,
  rejectRequest,
}
