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

UserSchema.methods.enroll = function (course) {
    // avoid course duplicates
    for (const courseObj of this.enrolledCourses) {
        if (courseObj._id.equals(course._id)) {
            return;
        }
    }

    for (const student of course.students) {
        if (student._id.equals(this._id)) {
            return;
        }
    }
    this.enrolledCourses.push(course);
    course.students.push(this);
}
UserSchema.methods.addToWishList = function (course) {
    // avoid course duplicates
    for (const courseObj of this.wishList) {
        if (courseObj._id.equals(course._id)) {
            return;
        }
    }

    this.wishList.push(course);
}



module.exports = mongoose.model("User", UserSchema);