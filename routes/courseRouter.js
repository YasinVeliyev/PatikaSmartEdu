const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.post("/create", courseController.createCourse);

module.exports = router;
