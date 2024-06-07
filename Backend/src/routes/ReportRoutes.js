const router = require("express").Router()
const upload = require("../utils/multer")

const {
  getReports,
  deleteReport,
  createReport,
} = require("../controllers/ReportController")
const { validateToken } = require("../middelware/validateToken")

router.get("/", getReports)
router.post("/", upload.array("screenshots", 5), validateToken, createReport)
router.delete("/:id", deleteReport)

module.exports = router
