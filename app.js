const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const pageRouter = require("./routes/pageRouter");
const courseRouter = require("./routes/courseRouter");

const app = express();
app.use(morgan("Method::method, Url::url, Status Code::status, Response Time::response-time"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(pageRouter);
app.use("/courses", courseRouter);

mongoose
    .connect("mongodb://localhost:27017/smartedu")
    .then(
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Sunucu port ${process.env.PORT || 5000} çalışır`);
        }),
    )
    .catch((err) => console.error(err));
