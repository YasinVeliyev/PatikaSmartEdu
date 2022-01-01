exports.getIndexPage = (req, res, next) => {
    res.render("index", { page_name: "/" });
};

exports.getAboutPage = (req, res, next) => {
    res.render("about", { page_name: "about" });
};
