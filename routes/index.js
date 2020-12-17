const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const Course = require("../models/course");
const Field = require("../models/field");
const bcrypt = require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const nodemailer = require('nodemailer');

require('dotenv').config();

const jwt = require("jsonwebtoken");

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
    // if user enters the correct secret code, then they will be instructors
    // defaults to students
    var role = "s";
    const secretCode = "123";
    if (req.body.secretCode === secretCode) {
        role = "i";
    }

    const emailToken = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY, { expiresIn: "20m" });
    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        emailToken: emailToken,
        role: role
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
        html: `
        <!doctype html>
        <html>
        
        <head>
            <meta charset='utf-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1'>
            <title>Snippet - BBBootstrap</title>
            <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet'>
            <link href='' rel='stylesheet'>
            <style></style>
            <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
            <script type='text/javascript'
                src='https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js'></script>
            <script type='text/javascript'></script>
        </head>
        
        <body oncontextmenu='return false' class='snippet-body'>
            <!DOCTYPE html>
            <html>
        
            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                    @media screen {
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 400;
                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                        }
        
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 700;
                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                        }
        
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 400;
                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                        }
        
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 700;
                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                        }
                    }
        
                    /* CLIENT-SPECIFIC STYLES */
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
        
                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }
        
                    img {
                        -ms-interpolation-mode: bicubic;
                    }
        
                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }
        
                    table {
                        border-collapse: collapse !important;
                    }
        
                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
        
                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
        
                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }
        
                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                </style>
            </head>
        
            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                <!-- HIDDEN PREHEADER TEXT -->
                <div
                    style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                    We're thrilled to have you here! Get ready to dive into your new account. </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- LOGO -->
                    <tr>
                        <td bgcolor="#FFA73B" align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" valign="top"
                                        style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                        <h6 style="font-size: 48px; font-weight: 400; margin: 2;">Udema</h6> <img
                                            src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125"
                                            height="120" style="display: block; border: 0px;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="left"
                                        style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;">We're excited to have you get started. First, you need to confirm
                                            your account. Just press the button below.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#ffffff" align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a
                                                                    href=${req.protocol}://${req.get("host")}/confirm?token=${emailToken} target="_blank"
                                                                    style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm
                                                                    Account</a></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr> <!-- COPY -->
                                <tr>
                                    <td bgcolor="#ffffff" align="left"
                                        style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;">If that doesn't work, copy and paste the following link in your
                                            browser:</p>
                                    </td>
                                </tr> <!-- COPY -->
                                <tr>
                                    <td bgcolor="#ffffff" align="left"
                                        style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;"><a href=${req.protocol}://${req.get("host")}/confirm?token=${emailToken} target="_blank"
                                                style="color: #FFA73B;">${req.protocol}://${req.get("host")}/confirm?token=${emailToken}</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#ffffff" align="left"
                                        style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;">Note that the link above is only valid within 20 minutes. If you do not use it then after that your profile will be deleted !</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#ffffff" align="left"
                                        style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;">Cheers,<br>Udema Team</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#FFECD1" align="center"
                                        style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more
                                            help?</h2>
                                        <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re
                                                here to help you out</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#f4f4f4" align="left"
                                        style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                                        <br>
                                        <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#"
                                                target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        
            </html>
        </body>
        
        </html>
        `
    };

    const info = await transporter.sendMail(mailOptions);
    if (info) {
        console.log("Email sent: " + info.response);
        return res.render("emailConfirmation", {
            layout: false,
            success_msg: "We have sent you a confirmation link to your email. Please check it out and activate your account"
        });
    }
    // error happens
    res.redirect("/");


})
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
        await User.deleteOne({ emailToken: req.query.token });
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
    successRedirect: "/",
    failureFlash: true
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