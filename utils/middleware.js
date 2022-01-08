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
        res.locals.userIn = req.session.userId;
        let user = await User.findById(req.session.userId);
        if (user) {
            req.user = user;
        }
    }
    next();
};

exports.checkUserRole = (roles) => {
    return async (req, res, next) => {
        const user = await User.findById(req.session.userId);
        if (roles.includes(user.role)) {
            next();
        } else {
            res.status(401).send("You can not do this");
        }
    };
};
