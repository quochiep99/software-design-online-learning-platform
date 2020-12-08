const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
    res.render("landing");
})
router.get("/register", (req, res) => {
    res.render("register");
})

module.exports = router;