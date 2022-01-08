const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["Student", "Teacher", "Admin"],
        default: "Student",
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 12);
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({}).populate("courses");
    next();
});

userSchema.methods.checkPassword = async function (password, hash) {
    return await bcrypt.compare(password, hash);
};

const User = model("User", userSchema);
module.exports = User;
