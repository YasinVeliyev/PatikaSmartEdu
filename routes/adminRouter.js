const express = require("express");

const adminController = require("../controllers/adminController");
const middleware = require("../utils/middleware");

const router = express.Router();

router.get("/dashboard", middleware.checkUserRole(["Admin"]), adminController.getAdminDashboardPage);
router
    .route("/delete/user/:userId")
    .delete(middleware.loginRequired, middleware.checkUserRole(["Admin"]), adminController.deleteUser);

module.exports = router;
