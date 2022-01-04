const express = require("express");
const authController = require("../controllers/authController");
const middleware = require("../utils/middleware");
const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/signin", authController.loginUser);
router.get("/logout", middleware.loginRequired, authController.logoutUser);
router.get("/dashboard", middleware.loginRequired, authController.getDashboardPage);

module.exports = router;
