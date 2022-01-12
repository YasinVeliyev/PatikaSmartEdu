const { Router } = require("express");

const categoryController = require("../controllers/categoryController");
const middleware = require("../utils/middleware");

router = Router();

router
    .route("/create")
    .post(middleware.loginRequired, middleware.checkUserRole(["Admin"]), categoryController.createCategory);

module.exports = router;
