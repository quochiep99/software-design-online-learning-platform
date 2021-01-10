const express = require("express");
const Course = require("../models/course");
const Field = require("../models/field");
const Review = require("../models/review");
const middleware = require("../middleware");
const path = require("path");

const router = express.Router({
    mergeParams: true
});

// View all courses
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



// Show page
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
        course.reviews.sort((review1, review2) => {
            if (review1.updatedAt > review2.updatedAt) {
                return -1;
            } else if (review1.updatedAt < review2.updatedAt) {
                return 1;
            }
            return 0;
        });
        const recommendedCourses = await Course.
            find({ field: field._id }).
            sort("-totalStudents").
            limit(5).
            populate("field");
        if (course) {
            var isPurchased = false;
            var isWishlisted = false;
            if (req.user) {
                const student = req.user;
                for (const enrolledCourse of student.enrolledCourses) {
                    if (enrolledCourse._id.equals(course._id)) {
                        isPurchased = true;
                        break;
                    }
                }
                for (const wishlistedCourse of student.wishList) {
                    if (wishlistedCourse._id.equals(course._id)) {
                        isWishlisted = true;
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
                isPurchased: isPurchased,
                isWishlisted: isWishlisted
            });
        }
    }
    res.redirect("/");
});

// Purchase
router.get("/:id/purchase", middleware.ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const course = await Course.findById(req.params.id);
    user.enroll(course);
    await user.save();
    await course.save();
    // Go to course
    res.redirect(`/it/${req.params.field}/courses/${req.params.id}/learn`);
});

// Preview route
router.get("/:id/preview/", async (req, res) => {
    const course = await Course.findById(req.params.id).
        populate("field");
    res.render("learn", {
        layout: false,
        course: course,
        isPreviewMode: true
    })
});

router.get("/:id/preview/:currentLessonName", async (req, res) => {
    const course = await Course.findById(req.params.id);
    const curriculum = course.curriculum;
    for (var i = 0; i < curriculum.children.length; i++) {
        for (var j = 0; j < curriculum.children[i].children.length; j++) {
            if (path.parse(curriculum.children[i].children[j].name).name === req.params.currentLessonName) {
                const videoPath = curriculum.children[i].children[j].path.replace("public", "").replace(/\\/g, "/");
                return res.render("learn", {
                    layout: false,
                    course: course,
                    videoPath: videoPath,
                    currentLessonName: req.params.currentLessonName,
                    isPreviewMode: true
                })
            }
        }
    }
});

// Learn route
router.get("/:id/learn/", middleware.ensureAuthenticated, middleware.checkEnrolledCourseOwnership, async (req, res) => {
    const course = await Course.findById(req.params.id).
        populate("field");
    res.render("learn", {
        layout: false,
        course: course,
        isPreviewMode: false
    })
});

router.get("/:id/learn/:currentLessonName", middleware.ensureAuthenticated, middleware.checkEnrolledCourseOwnership, async (req, res) => {
    const course = await Course.findById(req.params.id);
    const curriculum = course.curriculum;
    for (var i = 0; i < curriculum.children.length; i++) {

        for (var j = 0; j < curriculum.children[i].children.length; j++) {
            if (path.parse(curriculum.children[i].children[j].name).name === req.params.currentLessonName) {
                const videoPath = curriculum.children[i].children[j].path.replace("public", "").replace(/\\/g, "/");
                return res.render("learn", {
                    layout: false,
                    course: course,
                    videoPath: videoPath,
                    currentLessonName: req.params.currentLessonName
                })
            }
        }
    }
});

// Leave a Review route
router.post("/:id/reviews/", middleware.ensureAuthenticated, middleware.checkEnrolledCourseOwnership, async (req, res) => {
    // The person making the review
    const user = req.user;

    const { rating, body } = req.body;

    // Create review
    var review = await Review.create({
        rating,
        body
    });
    review.author = user;
    review = await review.save();

    var course = await Course.findById(req.params.id).
        populate("field").
        populate("reviews");
    course.addReview(review);
    await course.save();

    req.flash("success_msg", "Thank you for your feedback !");
    res.redirect(`/it/${course.field.name}/courses/${course._id}`);
})

// Add course to wishlist
router.get("/:id/wishlist", middleware.ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const course = await Course.findById(req.params.id);
    user.addToWishList(course);
    await user.save();
    await course.save();
    res.redirect("./");
});

// Remove course from wishlist
router.get("/:id/unwishlist", middleware.ensureAuthenticated, async (req, res) => {
    const user = req.user;
    const course = await Course.findById(req.params.id);
    user.removeFromWishList(course);
    await user.save();
    await course.save();
    res.redirect("/my-courses/wishlist");

});

module.exports = router;