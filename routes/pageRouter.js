const express = require("express");
const pageController = require("../controllers/pageController");
const middleware = require("../utils/middleware");
const router = express.Router();

router.get("/", pageController.getIndexPage);
router.get("/about", pageController.getAboutPage);
router.get("/register", middleware.isLoggedIn, pageController.getRegisterPage);
router.get("/login", middleware.isLoggedIn, pageController.getLoginPage);

module.exports = router;
