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
router.get("/", middleware.isLoggedIn, courseController.getAllCourse);
router
    .route("/:courseId")
    .get(middleware.isLoggedIn, courseController.getCourse)
    .delete(middleware.loginRequired, middleware.checkUserRole(["Teacher", "Admin"]), courseController.deleteCourse);

router.post("/enroll", middleware.loginRequired, courseController.enrollCourse);

module.exports = router;
