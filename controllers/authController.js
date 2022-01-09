const User = require("../models/userModel");
const Course = require("../models/courseModel");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res, next) => {
    const { username, email, firstname, lastname, password, confirmpassword } = req.body;
    try {
        await User.create({ username, email, firstname, lastname, password });
        return res.redirect("/login");
    } catch (error) {
        const errors = validationResult(req);
        console.log(errors);
        req.flash("errors", errors.errors);
        res.status(400).redirect("/register");
    }
};

exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.checkPassword(password, user.password))) {
        req.session.userId = user._id;
        return res.redirect("/");
    }
    const errors = validationResult(req);
    req.flash("errors", [...errors.errors, { param: "error", msg: "Your Username or Password is wrong" }]);
    res.status(400).redirect("/login");
};

exports.logoutUser = async (req, res, next) => {
    req.session.destroy(() => res.redirect("/login"));
};

exports.getDashboardPage = async (req, res, next) => {
    try {
        const courses = await User.findById(req.user._id);
        return res.render("dashboard", { page_name: "dashboard", user: req.user, courses: courses.courses });
    } catch (error) {
        res.json({ status: fail });
    }
};

exports.getMyAllEnrolledCourses = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        res.render("courses", { courses: user.courses || [], page_name: "mycourses", user: req.user });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.getMyAllTeaching = async (req, res, next) => {
    try {
        let courses = await Course.find({ teacher: req.user._id });
        res.render("courses", { courses, page_name: "myteaching", user: req.user });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};
