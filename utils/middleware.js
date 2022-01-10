const User = require("../models/userModel");

exports.loginRequired = async (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        return res.redirect(`/login?next=${req.originalUrl}`);
    }
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.session.userId) {
        res.locals.userIn = true;
        try {
            let user = await User.findById(req.session.userId);
            if (user) {
                req.user = user;
            }
        } catch (err) {
            console.log(err);
            res.redirect("/login");
        }
    } else {
        res.locals.userIn = false;
    }
    next();
};

exports.checkUserRole = (roles) => {
    return async (req, res, next) => {
        const user = await User.findById(req.session.userId);
        if (roles.includes(user.role)) {
            next();
        } else {
            req.flash("error", "You dont have permission for this");
            res.status(401).redirect("/users/dashboard");
        }
    };
};
