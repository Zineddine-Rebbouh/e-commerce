const Notification = require("../models/Notification")

const addNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body

    // Create a new notification document
    const notification = new Notification({
      userId,
      type,
      message,
    })

    // Save the notification to the database
    await notification.save()

    res.status(201).json({
      success: true,
      message: "Notification added successfully",
      notification,
    })
  } catch (error) {
    console.error("Error adding notification:", error)
    res.status(500).json({
      success: false,
      message: "Failed to add notification",
      error: error.message,
    })
  }
}

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userId })
    console.log(notifications)
    return res.status(200).json(notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id
    await Notification.findByIdAndUpdate(notificationId, {
      isRead: true,
    })
    return res.status(200).json({ message: "Notification Updated" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id
    await Notification.findByIdAndDelete(notificationId)
    return res.status(200).json({ message: "Notification Removed " })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
}
