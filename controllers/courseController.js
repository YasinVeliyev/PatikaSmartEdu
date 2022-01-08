const Course = require("../models/courseModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.createCourse = async (req, res, next) => {
    const { name, description, category } = req.body;
    try {
        const course = await Course.create({ name, description, category, teacher: req.user._id });
        res.status(201).json({
            status: "success",
            data: { course },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.getAllCourse = async (req, res, next) => {
    try {
        let courses;
        if (req.query.teacherId) {
            courses = await Course.find({ teacher: req.query.teacherId });
        } else {
            courses = await Course.find({});
        }
        console.log(req.user);
        res.render("courses", { courses, page_name: "courses", user: req.user });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.getCourse = async (req, res, next) => {
    let enrolled;
    if (req.user) {
        enrolled = req.user.courses.filter((course) => course._id == req.params.courseId)[0];
    }
    try {
        const course = await Course.findById(req.params.courseId);
        res.render("course", { course, page_name: "course", user: req.user, enrolled });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.enrollCourse = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $push: { courses: req.body.courseId },
        });
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};
