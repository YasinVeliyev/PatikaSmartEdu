const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const flash = require("connect-flash");

const pageRouter = require("./routes/pageRouter");
const courseRouter = require("./routes/courseRouter");
const authRouter = require("./routes/authRouter");
const middleware = require("./utils/middleware");

const app = express();

app.use(morgan("Method::method, Url::url, Status Code::status, Response Time::response-time"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
        secret: "secret_key",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: "mongodb://localhost/smartedu" }),
    }),
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.set("view engine", "ejs");

app.use(middleware.isLoggedIn);

app.use(pageRouter);
app.use("/courses", courseRouter);
app.use("/users", authRouter);
mongoose
    .connect("mongodb://localhost:27017/smartedu")
    .then(
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Sunucu port ${process.env.PORT || 5000} çalışır`);
        }),
    )
    .catch((err) => console.error(err));
