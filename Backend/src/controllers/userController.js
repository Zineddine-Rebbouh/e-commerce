const User = require("../models/User")

const getUser = async (req, res) => {
  try {
    console.log("her")
    console.log(req.userId)
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400))
    }
    console.log(user)
    res.status(200).json({ user: user })
  } catch (error) {
    console.error(error.message)
    return next(new ErrorHandler(error.message, 500))
  }
}

module.exports = { getUser }
