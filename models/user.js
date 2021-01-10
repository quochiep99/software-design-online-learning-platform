const mongoose = require("mongoose");
const Course = require("./course");
const Field = require("./field");
const path = require("path");
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

UserSchema.methods.updateProgress = function (courseName, progress) {
    for (var i = 0; i < this.progress.length; i++) {
        // course name
        if (this.progress[i].name === courseName) {
            for (var j = 0; j < this.progress[i].children.length; j++) {
                // course section
                for (var k = 0; k < this.progress[i].children[j].children.length; k++) {
                    // course unit 
                    // unit name
                    const unitName = path.parse(this.progress[i].children[j].children[k].name).name;
                    if (unitName in progress) {
                        this.progress[i].children[j].children[k].isWatched = true;
                    } else {
                        this.progress[i].children[j].children[k].isWatched = false;
                    }
                }
            }
            break;
        }
    }
}



module.exports = mongoose.model("User", UserSchema);