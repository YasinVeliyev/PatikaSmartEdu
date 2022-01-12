const Category = require("../models/categoryModel");

exports.createCategory = async (req, res, next) => {
    let { name } = req.body;
    try {
        await Category.create({ name });
        req.flash("success", "Category created");
        res.redirect("/users/dashboard");
    } catch (error) {
        req.flash("error", "Something happened");
    }
};
