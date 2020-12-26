const express = require("express");
const Course = require("../models/course");
const Field = require("../models/field");
const middleware = require("../middleware");
const User = require("../models/user");

const router = express.Router({
    mergeParams: true
});

router.get("/", async (req, res) => {
    const fieldName = req.params.field;
    const field = await Field.findOne({
        name: fieldName
    });
    if (field) {
        const ratingDescending = req.query.ratingDescending;
        const priceAscending = req.query.priceAscending;
        const requestedPage = req.query.page || 1;
        const requestedLimit = parseInt(req.query.limit || 3);
        const options = {
            page: requestedPage,
            limit: requestedLimit,
            populate: ["field", "instructor", "reviews"],
        };
        if (ratingDescending && priceAscending) {
            options.sort = {
                rating: -1,
                discountPrice: 1
            }
        } else if (priceAscending) {
            options.sort = {
                discountPrice: 1
            }
        } else if (ratingDescending) {
            options.sort = {
                rating: -1
            }
        }

        const result = await Course.paginate({ field: field._id }, options);
        res.render("courses/index", {
            result: result
        });
    } else {
        res.redirect("/");
    }
});


router.get("/:id", async (req, res) => {
    const fieldName = req.params.field;
    const field = await Field.findOne({
        name: fieldName
    });
    if (field) {
        const course = await Course.findById(req.params.id).
            populate({
                path: "reviews",
                populate: {
                    path: "author",
                },
            }).
            populate({
                path: "students"
            }).
            populate({
                path: "instructor",
            }).
            populate({
                path: "field"
            });
        const recommendedCourses = await Course.
            find({ field: field._id }).
            sort("-totalStudents").
            limit(5).
            populate("field");
        if (course) {
            var purchase = false;
            if (req.user) {
                const student = req.user;
                for (const enrolledCourse of student.enrolledCourses) {
                    if (enrolledCourse._id.equals(course._id)) {
                        purchase = true;
                        break;
                    }
                }
            }


            // increment views as users visit the course
            course.numViews++;
            await course.save();
            return res.render("courses/show", {
                course: course,
                recommendedCourses: recommendedCourses,
                purchase: purchase
            });
        }
    }
    res.redirect("/");
});

router.get("/:id/learn", middleware.isLoggedIn, async (req, res) => {
    const user = req.user;
    const course = await Course.findById(req.params.id);
    user.enroll(course);
    await user.save();
    await course.save();


    const fieldName = req.params.field;
    const field = await Field.findOne({
        name: fieldName
    });
    if (field) {
        const course = await Course.findById(req.params.id).
            populate({
                path: "reviews",
                populate: {
                    path: "author",
                },
            }).
            populate({
                path: "students"
            }).
            populate({
                path: "instructor",
            }).
            populate({
                path: "field"
            });
        const recommendedCourses = await Course.
            find({ field: field._id }).
            sort("-totalStudents").
            limit(5).
            populate("field");
        if (course) {
            // increment views as users visit the course
            course.numViews++;
            await course.save();
            return res.render("courses/show", {
                course: course,
                recommendedCourses: recommendedCourses
            });
        }
    }
    res.redirect("/");
});

module.exports = router;