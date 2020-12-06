const express = require("express");
const router = express.Router({ mergeParams: true });
const Course = require("../models/course");

router.get("/:field", async (req, res) => {
    
    res.render("courses/index");
})

router.get("/:field/new", (req, res) => {
    res.render("courses/new");
})

// router.get("/:field/:id", (req, res) => {
//     res.render("courses/show")
// })

module.exports = router;