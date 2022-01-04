const express = require("express");
const courseController = require("../controllers/courseController");
const middleware = require("../utils/middleware");
const router = express.Router();

router.post(
    "/create",
    middleware.loginRequired,
    middleware.checkUserRole(["Teacher", "Admin"]),
    courseController.createCourse,
);
router.get("/", courseController.getAllCourse);
router.get("/:courseId", courseController.getCourse);

module.exports = router;
