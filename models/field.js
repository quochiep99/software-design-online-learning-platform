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
    ],
    totalStudents: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

// create indexes for field.name to perform a full-text search on
FieldSchema.index({ name: "text" });

module.exports = mongoose.model("Field", FieldSchema);
