const mongoose = require("mongoose");
const Course = require("./course");
const Field = require("./field");
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

    // Track student's course progress
    progress: [],
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
    this.progress.push(course.curriculum);
    course.students.push(this);
    course.totalStudents++;
    Field.findById(course.field)
        .then((field) => {
            field.totalStudents++;
            field.save()
                .then(() => {
                    console.log("Field's total students updated !!!");
                })
        })
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

UserSchema.methods.removeFromWishList = function (course) {
    // find course to remove from wishList
    for (var i = 0; i < this.wishList.length; i++) {
        if (this.wishList[i]._id.equals(course._id)) {
            this.wishList.splice(i, 1);
            break;
        }
    }
}



module.exports = mongoose.model("User", UserSchema);