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
router
    .route("/:courseId")
    .get(courseController.getCourse)
    .delete(middleware.loginRequired, middleware.checkUserRole(["Teacher", "Admin"]), courseController.deleteCourse);

router.post("/enroll", middleware.loginRequired, courseController.enrollCourse);
router.put(
    "/update/:courseId",
    middleware.loginRequired,
    middleware.checkUserRole(["Teacher", "Admin"]),
    courseController.updateCourse,
);

module.exports = router;
