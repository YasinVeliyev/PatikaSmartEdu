const Course = require("../models/courseModel");
const User = require("../models/userModel");

exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        Course.deleteMany({ teacher: req.params.userId }, async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
        req.flash("success", `User has been deleted`);
        res.redirect("/users/dashboard");
    } catch (error) {
        console.log(error);
        req.flash("error", "Something get wrong Please try again");
        res.status(400).redirect(req.get("Referer"));
    }
};
