const User = require("../models/userModel");

exports.deleteUser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndDelete(req.params.userId);
        req.flash("success", `User has been deleted`);
        res.redirect("/users/dashboard");
    } catch (error) {
        console.log(error);
        req.flash("error", "Something get wrong Please try again");
        res.status(400).redirect(req.get("Referer"));
    }
};
