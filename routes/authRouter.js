const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.createUser);
router.post("/signin", authController.loginUser);
router.get("/logout", authController.logoutUser);

module.exports = router;
