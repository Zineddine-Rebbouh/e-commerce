const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000

const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const path = require("path")
const cloudinary = require("cloudinary").v2

const userRoutes = require("./routes/userRoutes")
const categoriesRoutes = require("./routes/categoriesRoutes")
const productsRoutes = require("./routes/productRoutes")
const ShopRoutes = require("./routes/ShopRoutes")
const ErrorHandler = require("./utils/ErrorHandler")

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "uploads")))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/shop", ShopRoutes)
// app.use("/api/orders", require("./routes/ordersRoutes"))
// app.use("/api/cart", require("./routes/cartRoutes"))
// app.use("/api/addresses", require("./routes/addressesRoutes"))
// app.use("/api/payment", require("./routes/paymentRoutes"))

app.use(ErrorHandler)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err))

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDIANRY_API_SECRET,
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
