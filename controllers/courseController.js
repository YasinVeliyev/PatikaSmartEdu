const Course = require("../models/courseModel");

exports.createCourse = async (req, res, next) => {
    const { name, description } = req.body;
    const course = await Course.create({ name, description });
    res.status(201).json({
        status: "success",
        data: { course },
    });
};
