const router = require("express").Router()

// using eventController

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController")

router.post("/", createEvent)
router.get("/", getEvents)
router.get("/:id", getEvent)
router.put("/:id", updateEvent)
router.delete("/:id", deleteEvent)

module.exports = router
