const express = require("express");
const router = express.Router({ mergeParams: true });
const Field = require("../models/field");
router.get("/:field", async (req, res) => {
    const fieldName = req.params.field;
    const field = await Field.findOne({ name: fieldName }).populate({ path: "courses" }).lean();    
    res.render("courses/index", {
        courses: field.courses
    });
})

router.get("/:field/new", (req, res) => {
    res.render("courses/new");
})

// router.get("/:field/:id", (req, res) => {
//     res.render("courses/show")
// })

module.exports = router;