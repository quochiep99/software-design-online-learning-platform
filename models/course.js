const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true        
    },
    field: {
        type: String,
        required: true        
    },
    instructor: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    courseImage: {
        type: String
    },
    cost: {
        type: Number,
        default: 0

    },

    //number of views of this course
    numViews: {
        type: Number,
        default: 0
    }
})