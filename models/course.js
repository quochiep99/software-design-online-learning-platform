const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

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
        ref: "User"
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
    image1xURL: String,
    image2xURL: String,

    // cost of the course
    discountPrice: reqNum,
    originalPrice: reqNum,

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

CourseSchema.plugin(mongoosePaginate);


module.exports = mongoose.model("Course", CourseSchema);