const Course = require("../models/courseModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

exports.createCourse = async (req, res, next) => {
    const { name, description, category } = req.body;
    try {
        const course = await Course.create({ name, description, category, teacher: req.user._id });
        res.redirect("/users/myteaching");
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
        }
        if (req.query.search) {
            let pattern = new RegExp(`^${req.query.search}`);
            courses = await Course.find({ name: { $regex: pattern, $options: "si" } });
        } else {
            courses = await Course.find({});
        }
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
        enrolled = req.user.courses?.filter((course) => course._id == req.params.courseId)[0];
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

exports.deleteCourse = async (req, res, next) => {
    try {
        if (req.user.role == "Admin" || req.user.courses.filter((course) => course._id == req.params.courseId)[0]) {
            const course = await Course.findByIdAndDelete(req.params.courseId);
            req.flash("success", `${course.name} Course has been deleted`);
        } else {
            console.log(req.url, req.params.courseId);
            req.flash("error", `You dont have permission to delete  this course`);
            return res.redirect(`/courses/${req.params.courseId}`);
        }
        return res.redirect(req.get("Referer"));
    } catch (error) {
        req.flash("error", "Something get wrong Please try again");
        res.status(400).redirect(req.get("Referer"));
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
