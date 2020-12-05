const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/:field", (req, res) => {
    res.render("courses/index");
})

router.get("/:field/:id", (req, res) => {
    res.render("courses/show")
})

module.exports = router;