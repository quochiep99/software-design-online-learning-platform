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
    }
}, {
    timestamps: true
})

// create indexes for field.name to perform a full-text search on
FieldSchema.index({name: "text"});

FieldSchema.methods.calculateTotalStudents = async function () {
    await this.populate("courses").execPopulate();
    for (var i = 0; i < this.courses.length; i++) {
        this.totalStudents += await this.courses[i].students.length;
    }
    return this.totalStudents;
}

module.exports = mongoose.model("Field", FieldSchema);
