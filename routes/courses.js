const express = require("express");
const Course = require("../models/course");
const router = express.Router({ mergeParams: true });
const Field = require("../models/field");
router.get("/:field", async (req, res) => {
    const fieldName = req.params.field;
    const field = await Field.findOne({ name: fieldName });
    if (field) {
        const courses = await Course.find({ field: field._id }).populate({ path: "field" }).lean();
        return res.render("courses/index", {            
            courses: courses,
            helpers: {
                getFieldName: (fieldName) => {
                    return fieldName.replace("-", " ");
                }
            }
        });
    }
    res.redirect("/");

})

router.get("/:field/new", (req, res) => {
    res.render("courses/new");
})

// router.get("/:field/:id", (req, res) => {
//     res.render("courses/show")
// })

module.exports = router;