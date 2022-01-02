const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.post("/create", courseController.createCourse);
router.get("/", courseController.getAllCourse);
router.get("/:courseId", courseController.getCourse);

module.exports = router;
