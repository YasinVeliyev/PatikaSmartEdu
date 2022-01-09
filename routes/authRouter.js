const express = require("express");
const { body, check } = require("express-validator");

const authController = require("../controllers/authController");
const middleware = require("../utils/middleware");
const User = require("../models/userModel");
const router = express.Router();

router.post(
    "/signup",
    [
        body("username")
            .not()
            .isEmpty()
            .withMessage("Please Enter Your Username")
            .custom((username) => {
                return User.findOne({ username }).then((user) => {
                    if (user) {
                        return Promise.reject("Username already taken");
                    }
                });
            }),
        body("firstname").not().isEmpty().withMessage("Please Enter Your First name"),
        body("lastname").not().isEmpty().withMessage("Please Enter Your Last name"),
        body("email")
            .isEmail()
            .withMessage("Please Enter A valid email")
            .custom((email) => {
                return User.findOne({ email }).then((user) => {
                    if (user) {
                        return Promise.reject("Email already taken");
                    }
                    return true;
                });
            }),
        body("password")
            .not()
            .isEmpty()
            .withMessage("Password Required")
            .isLength({ min: 6 })
            .withMessage("Must be at least 6 chars long"),
        body("confirmpassword")
            .not()
            .isEmpty()
            .withMessage("Confirm Password Required")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    return Promise.reject("Password confirmation does not match password");
                }
                return true;
            }),
    ],
    authController.createUser,
);
router.post(
    "/signin",
    [
        body("username").not().isEmpty().withMessage("Please Enter Your Username"),
        body("password").not().isEmpty().withMessage("Please Enter Your Password"),
    ],
    authController.loginUser,
);
router.get("/logout", middleware.loginRequired, authController.logoutUser);
router.get("/dashboard", middleware.loginRequired, authController.getDashboardPage);
router.get("/mycourses", middleware.loginRequired, authController.getMyAllEnrolledCourses);
router.get("/myteaching", middleware.loginRequired, authController.getMyAllTeaching);

module.exports = router;
