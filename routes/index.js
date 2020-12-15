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
        sort("-totalStudents").
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

// Search for fields or courses keywords
router.get("/search", async (req, res) => {
    // req.session.previousQuery = 
    const q = req.query.q;
    const ratingDescending = req.query.ratingDescending;
    const priceAscending = req.query.priceAscending;
    const requestedPage = req.query.page || 1;
    const requestedLimit = parseInt(req.query.limit || 3);

    const options = {
        page: requestedPage,
        limit: requestedLimit,
        populate: ["field", "instructor", "reviews"]
    };
    if (ratingDescending === "on" && priceAscending === "on") {
        options.sort = {
            rating: -1,
            discountPrice: 1
        }
    }
    else if (priceAscending) {
        options.sort = {
            discountPrice: 1
        }
    } else if (ratingDescending) {
        options.sort = {
            rating: -1
        }
    }

    // Search courses
    const result = await Course.paginate({ $text: { $search: q } }, options);
    const partiallySearchedCourses = await Course.find({ title: { $regex: q, $options: "i" } }).
        populate("field").
        populate("instructor").
        populate("reviews");

    for (var i = 0; i < partiallySearchedCourses.length; i++) {
        var isContained = false;
        for (var j = 0; j < result.docs.length; j++) {
            // if fields contains partiallySearchedCourses[i]
            if (result.docs[j].name === partiallySearchedCourses[i].name) {
                isContained = true;
                break;
            }
        }
        if (!isContained) {
            result.docs.push(partiallySearchedCourses[i]);
        }
    }
    // Search fields
    const fields = await Field.find({ $text: { $search: q } });
    const partiallySearchedFields = await Field.find({ name: { $regex: new RegExp(q) } });

    for (var i = 0; i < partiallySearchedFields.length; i++) {
        var isContained = false;
        for (var j = 0; j < fields.length; j++) {
            // if fields contains partiallySearchedFields[i]
            if (fields[j].name === partiallySearchedFields[i].name) {
                isContained = true;
                break;
            }
        }
        if (!isContained) {
            fields.push(partiallySearchedFields[i]);
        }
    }

    res.render("courses/index", {
        result: result,
        query: q,
        fields: fields
    });
});

module.exports = router;