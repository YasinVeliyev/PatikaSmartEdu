const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    res.render("index", { page: "/" });
});
app.get("/about", (req, res, next) => {
    res.render("about", { page: "about" });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Sunucu port ${process.env.PORT || 5000} çalışır`);
});
