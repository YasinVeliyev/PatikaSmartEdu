const { model, Schema } = require("mongoose");
const slugify = require("slugify");

let courseSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
});

const Course = model("Course", courseSchema);
module.exports = Course;
