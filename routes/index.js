const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Course = require("../models/course");
const Field = require("../models/field");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// Home page
router.get("/", async (req, res) => {

    // retrieve the most featured courses within the last 7 days
    // a course is featured when it has the most students registrations
    const mostFeaturedCourses = await Course.
        find({}).
        sort("-students.length").
        where("updatedAt").
        gte(new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))).
        limit(4).
        populate("field").
        populate("instructor");


    const mostViewedCourses = await Course.
        find({}).
        sort("-numViews").
        limit(10).
        populate("field").
        populate("instructor");

    const mostRecentCourses = await Course.
        find({}).
        sort("-updatedAt").
        limit(10).
        populate("field").
        populate("instructor");        

    // retrieve the most registered fields within the last 7 days
    const mostRegisteredFields = await Field.
        find({}).
        where("updatedAt").
        gte(new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000))).        
        sort("-totalStudents");



    res.render("landing", {
        mostViewedCourses: mostViewedCourses,
        mostRecentCourses: mostRecentCourses,
        mostRegisteredFields: mostRegisteredFields,
        mostFeaturedCourses: mostFeaturedCourses
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