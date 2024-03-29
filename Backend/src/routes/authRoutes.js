const express = require("express")
const router = express.Router()
const { register, login, logout } = require("../controllers/authController")
const { check, body } = require("express-validator")
const multer = require("multer")
const { validateToken } = require("../middelware/validateToken")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination directory for uploaded files
    cb(null, "src/uploads/")
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for uploaded files
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post(
  "/register",
  upload.single("avatar"),
  [
    body("name").notEmpty().withMessage("Full Name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match")
        }
        return true
      })
      .withMessage("Passwords do not match"),
  ],
  register
)

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  login
)

router.get("/logout", validateToken, logout)

module.exports = router
