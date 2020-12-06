const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = {
    type: String,
    required: true
}
const reqNum = {
    type: Number,
    default: 0
}

const CourseSchema = new Schema({
    // course's title
    title: reqString,

    // the subtitle or short description of the course
    subtitle: reqString,

    // detailed descriptions of the course
    descriptions: [
        reqString
    ],

    // the field that the course belongs to
    field: {
        type: Schema.Types.ObjectId,
        ref: "Field"
    },

    // instructor of the course
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor"
    },

    // reviews of the course
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    // course's average ratings
    rating: reqNum,

    students: [
        {
            type: Schema.Types.ObjectId,
            ref: " User"
        }
    ],

    // course's image
    courseImage: String,

    // cost of the course
    cost: reqNum,

    // number of views of this course
    numViews: reqNum,

    curriculum: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Course", CourseSchema);