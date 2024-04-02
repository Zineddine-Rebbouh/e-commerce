const User = require("../models/User")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const uploadImage = require("../utils/uploadImage")

const login = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Invalid credentials",
        errors: errors.array(),
      })
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({ message: "Invaild Credentails" })
    }

    const isEqual = await bcrypt.compare(req.body.password, user.password)
    if (!isEqual) {
      return res.status(401).json({
        message: "Invaild Credentails",
      })
    }
    // Sign JSON Web Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    })

    const cookieConfig = {
      httpOnly: true, // to disable accessing cookie via client side js
      secure: process.env.PROJECT_STATUS === "production", // to force https (if you use it)
      maxAge: 86400000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    }

    res.cookie("auth_token", token, cookieConfig)
    return res.status(200).json({ userId: user._id })
  } catch (error) {
    console.error("Error during Login:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const register = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array(),
      })
    }

    const { name, email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists" })
    }
    user = new User({
      name,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    if (req.file) {
      user.avatar = await uploadImage(req.file) // Assuming Multer has stored the file path in 'req.file.path'
    } else {
      user.avatar = null
    }
    await user.save()

    // creating token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    })

    const cookieConfig = {
      httpOnly: true, // to disable accessing cookie via client side js
      secure: process.env.PROJECT_STATUS === "production", // to force https (if you use it)
      maxAge: 86400000, // ttl in seconds (remove this option and cookie will die when browser is closed)
    }
    res.cookie("auth_token", token, cookieConfig)
    return res.status(201).send({ message: "registration success " })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token")
    return res.status(200).send({ message: "Logout success" })
  } catch (error) {
    console.error("Error during Logout:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
// Path: Backend/src/controllers/profileController.js
// Compare this snippet from Backend/src/routes/profileRoutes.js:
module.exports = { login, register, logout }
