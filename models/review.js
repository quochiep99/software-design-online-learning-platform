const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

const reqString = {
    type: String,
    required: true
}

const reqNum = {
    type: Number,
    default: 0.5
}

const ReviewSchema = new Schema({
    // the review content
    body: reqString,
    // the rating set to this course
    rating: reqNum,

    // the person making this review
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Review", ReviewSchema);