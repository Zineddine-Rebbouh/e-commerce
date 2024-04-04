const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/userController");
const { validateToken } = require("../middelware/validateToken");
const { Checkout } = require("../controllers/CheckoutController");

router.get("/", validateToken, getUser);

router.post("/checkout", validateToken, Checkout);

module.exports = router;
