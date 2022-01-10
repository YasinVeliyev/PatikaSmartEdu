const Course = require("../models/courseModel");
const User = require("../models/userModel");

exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        Course.find({ teacher: req.params.userId }).then(async (data) => {
            await Course.deleteMany({ teacher: req.params.userId });
            data.forEach(async (course) => {
                await User.updateMany({ courses: course._id }, { $pull: { courses: course._id } });
            });
        });
        req.flash("success", `User has been deleted`);
        res.redirect("/users/dashboard");
    } catch (error) {
        console.log(error);
        req.flash("error", "Something get wrong Please try again");
        res.status(400).redirect(req.get("Referer"));
    }
};
