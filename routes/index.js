const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Course = require("../models/course");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Home page
router.get("/", async (req, res) => {

    const courses = await Course.
        find({}).
        sort("numViews").
        limit(10).
        populate("field").
        populate("instructor");

    res.render("landing", {
        courses: courses
    });
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
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    function (email, password, cb) {
        User.findOne({ email: email })
            .then(async (user) => {
                if (!user) {
                    return cb(null, false)
                }

                //user exists, check for password 
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) {
                    return cb(null, false);
                }

                //now user has been verified
                return cb(null, user);
            })
            .catch((err) => {
                cb(err);
            });
    }));
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    })
})

router.get("/login", (req, res) => {
    res.render("login", { layout: false });
})

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/"
}))

// Log out
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})



module.exports = router;