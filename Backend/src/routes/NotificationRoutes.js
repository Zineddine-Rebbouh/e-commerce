const router = require("express").Router()

const {
  addNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/NotificationController")
const { validateToken } = require("../middelware/validateToken")

router.post("/add", addNotification)
router.get("/", validateToken, getNotifications)
router.put("/mark-as-read/:id", markAsRead)
router.delete("/delete/:id", deleteNotification)

module.exports = router
