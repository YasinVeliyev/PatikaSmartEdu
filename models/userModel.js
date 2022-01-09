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
    teaching: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 12);
    next();
});

// userSchema.post(/^find/, async function (docs) {
//     console.log(docs);
//     if (Array.isArray(docs)) {
//         for (let doc of docs) {
//             await doc.populate("courses");
//         }
//     } else {
//         await docs.populate("courses");
//     }
// });

userSchema.methods.checkPassword = async function (password, hash) {
    return await bcrypt.compare(password, hash);
};

const User = model("User", userSchema);
module.exports = User;
