const { sendEmail } = require("../utils/sendEmail");

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

exports.getContactPage = (req, res, next) => {
    res.render("contact", { page_name: "contact", user: req.user });
};

exports.sendEmail = (req, res, next) => {
    let { first_name, last_name, email, iPhone, message } = req.body;
    const outputMessage = `
        <h1>Mail Details</h1>
        <ul>
            <li>Full Name : ${first_name} ${last_name}</li>
            <li>Email: ${email}</li>
            <li>Mobile :${iPhone}</li>
        </ul>
        <h1>Message</h1>
        <p>${message}</p>
    `;
    sendEmail(email, outputMessage);
    res.redirect("/contact");
};
