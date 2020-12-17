const mongoose = require("mongoose");
const Course = require("./course");

const Schema = mongoose.Schema;

const reqString = {
    type: String,
    required: true
}

const UserSchema = new Schema({
    name: reqString,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: reqString,
    emailToken: String,    
    isConfirmed: {
        type: Boolean,
        default: false
    },

    // role
    // student, instructor, admin
    // type = s for student, i for instructor and a for admin
    role: {
        type: String,
        default: "s"
    },

    wishList: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    // for students
    enrolledCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    // for instructors
    uploadedCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    briefIntroduction: String
})

module.exports = mongoose.model("User", UserSchema);