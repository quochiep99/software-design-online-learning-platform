const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Course = require("../models/course");
const Field = require("../models/field");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const nodemailer = require('nodemailer');
const middleware = require("../middleware");
const multer = require("multer");
const path = require("path");
const checkFileType = require("../utils/checkFileType");
const decompress = require('decompress');
const fs = require('fs')
var rimraf = require("rimraf");
const dirTree = require("directory-tree");
const models = require("../utils/models")
require('events').EventEmitter.prototype._maxListeners = 100;



require('dotenv').config();

const jwt = require("jsonwebtoken");


// Set Storage Engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req.body);
        // console.log(file);
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // cb(null, "course_avatar_" + Date.now() + "_" + file.originalname)
        cb(null, file.originalname)
    }
})

// Init Upload
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("courseVideos");




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
    try {
        const { name, email, password, re_password } = req.body;
        const errors = [];

        // Input validation
        if (!name || !email || !password || !re_password) {
            errors.push("Please fill in all fields !");
        }
        if (password !== re_password) {
            errors.push("Passwords do not match !");
        }

        if (await User.findOne({ email })) {
            errors.push("This email already exists !");
        }
        // if errors exist
        if (errors.length) {
            req.flash("errors", errors);
            return res.redirect("/register");
        }
        // Validation passed !
        const salt = await bcrypt.genSalt(10);
        // we store the hashed version of user's password to DB
        const hashedPassword = await bcrypt.hash(password, salt);

        const emailToken = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY);
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            emailToken: emailToken
        })

        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.USER,
            to: newUser.email,
            subject: "Udema - Email Confirmation",
            html: require("../utils/emailConfirmation.js")(req, emailToken)
        };

        const info = await transporter.sendMail(mailOptions);
        if (info) {
            console.log("Email sent: " + info.response);
            req.flash("success_msg", "We have sent you a confirmation link to your email. Please check it out and activate your account");
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
        // error happens
        res.redirect("/");
    }
})

// Email confirmation
router.get("/confirm", async (req, res) => {
    try {
        const token = req.query.token;
        await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ emailToken: token });
        if (user) {
            // user has been confirmed
            user.isConfirmed = true;
            user.emailToken = null;
            await user.save();
            req.flash("success_msg", "Congratulations ! Your account has been activated successfully ! You may now login");
            return res.redirect("/login");
        }

        res.render("emailConfirmation", {
            layout: false,
            error_msg: "Token invalid or expired !"
        });
    } catch (err) {
        console.log(err);
        res.render("emailConfirmation", {
            layout: false,
            error_msg: "Token invalid or expired !"
        });
    }
})

// Log in
passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async function (email, password, cb) {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return cb(null, false, { message: "Incorrect email." });
            }

            // if user has not confirmed their emails then we prevent their login
            if (!user.isConfirmed) {
                return cb(null, false, { message: "You must confirm your email first before login !" });
            }

            // user exists, check for password 
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return cb(null, false, { message: "Incorrect password." });
            }

            //now user has been verified
            return cb(null, user);

        } catch (err) {
            console.log(err);
        }
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
    failureFlash: true
}), (req, res) => {
    res.redirect(req.session.returnTo || "/");
    delete req.session.returnTo;
})

// Log out
router.get("/logout", (req, res) => {
    const returnTo = req.session.returnTo || "/";
    req.logout();
    res.redirect(returnTo);
    delete returnTo;
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


// All enrolled courses
router.get("/my-courses/learning", middleware.ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).
            populate({
                path: "enrolledCourses",
                populate: {
                    path: "field"
                }
            }).
            populate({
                path: "enrolledCourses",
                populate: {
                    path: "instructor"
                }
            });

        res.render("enrolledCourses", {
            enrolledCourses: user.enrolledCourses,
            isAllCoursesChosen: true
        });
    } catch (e) {
        console.log(err);
    }

})

// wishlisted courses
router.get("/my-courses/wishlist", middleware.ensureAuthenticated, async (req, res) => {
    try {
        const student = await User.findById(req.user._id).
            populate({
                path: "wishList",
                populate: {
                    path: "field"
                }
            }).
            populate({
                path: "wishList",
                populate: {
                    path: "instructor"
                }
            });

        res.render("wishlistedCourses", {
            wishList: student.wishList,
            isWishListChosen: true
        });
    } catch (e) {
        console.log(e);
    }

})

router.get("/instructor/courses/", middleware.ensureAuthenticated, middleware.isInstructor, async (req, res) => {
    try {
        const instructor = await User.findById(req.user._id).
            populate({
                path: "uploadedCourses",
                populate: {
                    path: "field"
                }
            }).
            populate({
                path: "uploadedCourses",
                populate: {
                    path: "instructor"
                }
            });

        res.render("uploadedCourses", {
            uploadedCourses: instructor.uploadedCourses
        });
    } catch (e) {
        console.log(err);
    }

})

// Update profile
router.get("/profile", middleware.ensureAuthenticated, (req, res) => {
    isInstructor = req.user.role === "i" ? true : false;
    res.render("profile", {
        isInstructor: isInstructor
    });
})

router.post("/profile/basic-information", middleware.ensureAuthenticated, async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const isInstructor = req.user.role === "i" ? true : false;
    var briefIntroduction = "";
    if (isInstructor) {
        briefIntroduction = req.body.briefIntroduction;
    }
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        if (isInstructor) {
            user.briefIntroduction = briefIntroduction || user.briefIntroduction;
        }
        await user.save();
        req.flash("success_msg", "Basic information updated !");
        return res.redirect("/profile");
    }
    res.redirect("/");

})

router.post("/profile/account-security", middleware.ensureAuthenticated, async (req, res) => {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmedPassword = req.body.confirmedPassword;

    const user = await User.findById(req.user._id);

    if (currentPassword) {
        if (await bcrypt.compare(currentPassword, user.password)) {
            if (newPassword === currentPassword) {
                req.flash("error_msg", "You are entering old password. Please enter another one !");
                return res.redirect("/profile");
            } else if (newPassword === confirmedPassword) {
                const salt = await bcrypt.genSalt(10);
                const newHashedPassword = await bcrypt.hash(newPassword, salt);
                user.password = newHashedPassword;
                await user.save();
                req.flash("success_msg", "Password changed successfully !")
                return res.redirect("/profile");
            } else {
                req.flash("error_msg", "New passwords do not match !");
                return res.redirect("/profile");
            }
        } else {
            req.flash("error_msg", "Wrong password. Please try again !");
            return res.redirect("/profile");
        }
    }
    res.redirect("/profile");
})

// Create new courses
router.get("/courses/new", middleware.ensureAuthenticated, middleware.isInstructor, (req, res) => {
    res.render("courses/new", {
        layout: false
    });
})


// New course route - Upload video files
router.post("/upload/courses/new", middleware.ensureAuthenticated, middleware.isInstructor, (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            res.render("courses/new", {
                layout: false,
                error_msg: err
            })
        } else if (!req.file) {
            res.render("courses/new", {
                layout: false,
                error_msg: "Please upload your video files first !"
            })
        } else {
            // Unzip the zip file
            const filePath = `public/uploads/${req.file.originalname}`;
            await decompress(filePath, `public/uploads`);

            // Remove the zip file
            fs.unlinkSync(filePath);

            // Get JSON from directory structure
            const courseVideosPath = `public/uploads/${path.parse(req.file.originalname).name}`;
            const filteredTree = dirTree(courseVideosPath, { extensions: /\.mp4/ });

            // And save it to json file in same dir as the courseVideoPath
            const data = JSON.stringify(filteredTree);
            fs.writeFileSync(`${courseVideosPath}/${path.parse(req.file.originalname).name}.json`, data);

            req.body.instructor = req.user;
            req.body.curriculum = filteredTree;

            await models.createCourse(req.body);

            res.render("courses/new", {
                layout: false,
                success_msg: "File Uploaded !"
            })
        }

    })
})

// Edit courses
router.get("/it/:field/courses/:id/edit", middleware.ensureAuthenticated, middleware.isInstructor, middleware.checkUploadedCourseOwnership, async (req, res) => {
    const course = await Course.findById(req.params.id).
        populate("field");
    if (course) {
        return res.render("courses/edit", {
            layout: false,
            course: course
        });
    }
    res.redirect("/");
})

// Update course route - Upload video files
router.post("/upload/it/:field/courses/:id/", middleware.ensureAuthenticated, middleware.isInstructor, middleware.checkUploadedCourseOwnership, async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            req.flash("error_msg", err);
            res.redirect(req.session.returnTo || "/");
            delete req.session.returnTo;
        } else if (!req.file) {
            res.render("courses/edit", {
                layout: false,
                error_msg: "Please upload your video files first !",
                course: await Course.findById(req.params.id)
            })
        } else {
            // Remove existing course folder for update/editing purposes
            const courseVideosPath = `public/uploads/${path.parse(req.file.originalname).name}`;
            rimraf.sync(courseVideosPath);

            // Unzip the zip file
            const filePath = `public/uploads/${req.file.originalname}`;
            await decompress(filePath, `public/uploads`);

            // Remove the zip file
            fs.unlinkSync(filePath);

            // Get JSON from directory structure            
            const filteredTree = dirTree(courseVideosPath, { extensions: /\.mp4/ });

            // And save it to json file in same dir as the courseVideoPath
            const data = JSON.stringify(filteredTree);
            fs.writeFileSync(`${courseVideosPath}/${path.parse(req.file.originalname).name}.json`, data);

            req.body.instructor = req.user;
            req.body.curriculum = filteredTree;

            const editedCourse = await models.editCourse(req.params.id, req.body);

            req.flash("success_msg", "Your changes have been successfully saved !");
            res.redirect(`/it/${req.params.field}/courses/${req.params.id}`);
        }
    })
})

module.exports = router;