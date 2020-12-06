const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}

const FieldSchema = new Schema({

    name: reqString,

    //courses belonging to this field
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course"
        }
    ]

})
module.exports = mongoose.model("Field", FieldSchema);
