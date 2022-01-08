const express = require("express");
const pageController = require("../controllers/pageController");
const middleware = require("../utils/middleware");
const router = express.Router();

router.get("/", pageController.getIndexPage);
router.get("/about", pageController.getAboutPage);
router.get("/register", pageController.getRegisterPage);
router.get("/login", pageController.getLoginPage);
router.route("/contact").get(pageController.getContactPage).post(pageController.sendEmail);
module.exports = router;
