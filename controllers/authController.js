const User = require("../models/userModel");
const Course = require("../models/courseModel");

exports.createUser = async (req, res, next) => {
    const { username, email, firstname, lastname, password, confirmpassword } = req.body;
    if (password === confirmpassword) {
        await User.create({ username, email, firstname, lastname, password });
        return res.redirect("/login");
    }
    res.redirect("/register");
};

exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.checkPassword(password, user.password))) {
        req.session.userId = user._id;
        return res.redirect("/");
    }
    res.redirect("/login");
};

exports.logoutUser = async (req, res, next) => {
    req.session.destroy(() => res.redirect("/login"));
};

exports.getDashboardPage = async (req, res, next) => {
    try {
        const courses = await Course.find({ teacher: req.user._id });
        return res.render("dashboard", { page_name: "dashboard", user: req.user, courses });
    } catch (error) {
        res.json({ status: fail });
    }
};
