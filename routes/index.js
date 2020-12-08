const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const passport = require("passport");

// Home page
router.get("/", (req, res) => {
    res.render("landing");
})

// Register
router.get("/register", (req, res) => {
    res.render("register", { layout: false });
})
router.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    // we store the hashed version of user's password to DB
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    // if user enters the correct secret code, then it will be a instructor
    // defaults to students
    var role = "s";
    const secretCode = "123";
    if (req.body.secretCode === secretCode) {
        role = "i";
    }
    await new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role
    }).save();
    res.redirect("/login");
})

// Log in

router.get("/login", (req, res) => {
    res.render("login", { layout: false });
})

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/"
}))




module.exports = router;