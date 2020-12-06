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
    field: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Field"
        },
        fieldName: String
    },

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
                ref: "Review"
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
    // will check later in relation to reviews above
    numRatingStudents: reqNum,


    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: " User"
        }
    ],

    // number of students enrolling in the course
    // will check later in relation to students above
    numEnrollments: reqNum,

    // course's image
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
    ],
    curriculum: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Course", CourseSchema);