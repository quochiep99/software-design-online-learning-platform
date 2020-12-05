const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
    res.render("landing-o", {
        layout: false
    });
})

module.exports = router;