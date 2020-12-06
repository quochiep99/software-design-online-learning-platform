const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}

const UserSchema = new mongoose.Schema({
    firstName: reqString,
    lastName: reqString,
    email: {
        type: String,
        unique: true
    },
    password: reqString,

    // student, instructor, admin
    // type = s for student, i for instructor and a for admin
    role: {
        type: String
    },
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],

    // for students
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],
    // for instructors
    uploadedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]


})