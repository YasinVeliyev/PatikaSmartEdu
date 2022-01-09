const nodemailer = require("nodemailer");

exports.sendEmail = async (req, from, html) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    try {
        let info = await transporter.sendMail({
            from,
            to: "veliyev.yasin@gmail.com",
            html,
        });
    } catch (error) {
        req.flash("warning", "Error");
        console.error(error);
    }
};
