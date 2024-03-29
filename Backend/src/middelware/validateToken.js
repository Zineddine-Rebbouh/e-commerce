const validateToken = async (req, res, next) => {
  const token = req.cookies["auth_token"]
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.user._id
    next()
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" })
  }
}

module.exports = { validateToken }
