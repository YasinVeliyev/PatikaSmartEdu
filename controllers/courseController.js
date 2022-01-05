const Course = require("../models/courseModel");

// Course.find({}, (err, data) => {
//     console.log(data);
// });
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
            courses = await Course.find();
        }
        res.render("courses", { courses, page_name: "courses" });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.courseId);
        res.render("course", { course, page_name: "course" });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};
