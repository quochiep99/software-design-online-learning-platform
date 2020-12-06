const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}

const FieldSchema = new mongoose.Schema({

    fieldName: reqString,

    //courses belonging to this field
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }       

    ]

})
module.exports = mongoose.model("Field", FieldSchema);