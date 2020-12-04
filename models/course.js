const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}
const reqNum = {
    type: Number,
    default: 0
}

const CourseSchema = new mongoose.Schema({
    // course's title
    title: reqString,

    // the subtitle of the course
    subtitle: reqString,

    // the field that the course belongs to
    field: reqString,

    // instructor's name
    instructor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: reqString
    },

    // reviews of the course
    reviews: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reviews"
            },
            author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                username: reqString
            }
        }

    ],

    // course's average ratings
    rating: reqNum,

    // number of students rating the course
    numRatingStudents: reqNum,

    // number of students enrolling in the course
    numEnrollments: reqNum,

    // course image
    courseImage: {
        type: String
    },

    // cost of the course
    cost: reqNum,

    // number of views of this course
    numViews: reqNum,

    // detailed descriptions of the course
    descriptions: [
        reqString
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Course", CourseSchema);