const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/:id", (req, res) => {
    res.render("courses/show")
})

module.exports = router;