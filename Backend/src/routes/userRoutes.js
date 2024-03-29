const express = require("express")
const router = express.Router()
const { getUser } = require("../controllers/userController")
const { validateToken } = require("../middelware/validateToken")

router.get("/", validateToken, getUser)

module.exports = router
