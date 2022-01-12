const { model, Schema } = require("mongoose");
const slugify = require("slugify");

let courseSchema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    description: { type: String, required: true, trim: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
});

courseSchema.pre(/^find/, function (next) {
    this.populate("teacher");
    this.populate("category");
    next();
});

const Course = model("Course", courseSchema);
module.exports = Course;
