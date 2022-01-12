const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");

exports.createCourse = async (req, res, next) => {
    const { name, description, category } = req.body;
    try {
        const course = await Course.create({ name, description, category, teacher: req.user._id });
        await User.findByIdAndUpdate(req.user._id, { $push: { teaching: course._id } });
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
    let filter = {};
    try {
        if (req.query.teacherId) {
            filter["teacher"] = req.query.teacherId;
        }
        if (req.query.search) {
            let pattern = new RegExp(`^${req.query.search}`);
            filter.name = { $regex: pattern, $options: "si" };
        }
        let courses = await Course.find(filter);
        let categories = await Category.find({});   
        res.render("courses", { courses, page_name: "courses", user: req.user, categories });
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
        if (req.user.role == "Admin" || req.user.teaching.filter((course) => course._id == req.params.courseId)[0]) {
            const course = await Course.findByIdAndDelete(req.params.courseId);
            await User.updateMany(
                {},
                {
                    $pull: { teaching: req.params.courseId, courses: req.params.courseId },
                },
            );
            req.flash("success", `${course.name} Course has been deleted`);
        } else {
            req.flash("error", `You dont have permission to delete  this course`);
            return res.redirect(`/courses/${req.params.courseId}`);
        }
        return res.redirect(req.get("Referer"));
    } catch (error) {
        req.flash("error", "Something get wrong Please try again");
        res.status(400).redirect(req.get("Referer"));
    }
};
exports.updateCourse = async (req, res, next) => {
    const { name, description, category } = req.body;
    try {
        if (req.user.role == "Admin" || req.user.teaching.filter((course) => course._id == req.params.courseId)[0]) {
            Course.findByIdAndUpdate(req.params.courseId, { name, description, category }, (err, data) => {
                if (err) {
                    console.error(err);
                    req.flash("error", "Something get wrong Please try again");
                    return res.status(400).redirect(req.get("Referer"));
                }
                req.flash("success", `${data.name} Course has been updated`);
                return res.redirect(req.get("Referer"));
            });
        } else {
            req.flash("error", `You dont have permission to update  this course`);
            return res.redirect(`/courses/${req.params.courseId}`);
        }
    } catch (error) {}
};

exports.enrollCourse = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { courses: req.body.courseId },
            },
            { upsert: true },
        );
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};
