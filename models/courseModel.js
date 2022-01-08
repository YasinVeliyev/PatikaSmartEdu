const { model, Schema } = require("mongoose");
const slugify = require("slugify");

let courseSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
});

courseSchema.pre(/^find/, function (next) {
    this.find().populate("teacher");
    next();
});

const Course = model("Course", courseSchema);
module.exports = Course;
