const User = require("../models/userModel");

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
        return res.status(200).json({ status: "success" });
    }
    res.redirect("/login");
};
