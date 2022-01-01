const { model, Schema } = require("mongoose");

let courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
});

const Course = model("Course", courseSchema);
module.exports = Course;
