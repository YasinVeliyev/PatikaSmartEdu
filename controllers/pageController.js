exports.getIndexPage = (req, res, next) => {
    res.render("index", { page_name: "/", user: req.user });
};

exports.getAboutPage = (req, res, next) => {
    res.render("about", { page_name: "about", user: req.user });
};

exports.getRegisterPage = (req, res, next) => {
    res.render("register", { page_name: "register", user: req.user });
};

exports.getLoginPage = (req, res, next) => {
    res.render("login", { page_name: "login", user: req.user });
};
