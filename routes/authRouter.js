const express = require("express");
const authController = require("../controllers/authController");
const middleware = require("../utils/middleware");
const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/signin", authController.loginUser);
router.get("/logout", middleware.loginRequired, authController.logoutUser);
router.get("/dashboard", middleware.loginRequired, authController.getDashboardPage);
router.get("/mycourses", middleware.loginRequired, authController.getMyAllEnrolledCourses);
router.get("/myteaching", middleware.loginRequired, authController.getMyAllTeaching);

module.exports = router;
