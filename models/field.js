const mongoose = require("mongoose");
const Course = require("./course");

const Schema = mongoose.Schema;

const FieldSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    //courses belonging to this field
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]

})

module.exports = mongoose.model("Field", FieldSchema);
