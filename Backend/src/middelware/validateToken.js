const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.cookies["auth_token"];

    if (!token) {
      return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = { validateToken };
