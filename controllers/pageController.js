exports.getIndexPage = (req, res, next) => {
    console.log(req.session.userId);
    res.render("index", { page_name: "/" });
};

exports.getAboutPage = (req, res, next) => {
    res.render("about", { page_name: "about" });
};

exports.getRegisterPage = (req, res, next) => {
    res.render("register", { page_name: "register" });
};

exports.getLoginPage = (req, res, next) => {
    res.render("login", { page_name: "login" });
};
