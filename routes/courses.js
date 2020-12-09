const express = require("express");
const Course = require("../models/course");
const router = express.Router({ mergeParams: true });
const Field = require("../models/field");

function calculateAverageRating(course) {
    var sum = 0;
    course.reviews.forEach((review) => {
        sum += review.rating;
    })
    course.rating = sum / (course.reviews.length);
}
router.get("/:field", async (req, res) => {
    const fieldName = req.params.field;
    const field = await Field.findOne({ name: fieldName });
    if (field) {
        const requestedPage = req.query.page || 1;
        const requestedLimit = parseInt(req.query.limit || 3);
        const options = {
            page: requestedPage,
            limit: requestedLimit,
            populate: ["field", "instructor", "reviews"]
        }
        Course.paginate({ field: field._id }, options, (err, result) => {
            const courses = result.docs
            courses.forEach((course) => {
                calculateAverageRating(course);
            })
            res.render("courses/index", {
                courses: courses,
                helpers: {
                    getFieldName: (fieldName) => {
                        return fieldName.replace("-", " ");
                    }
                }
            });
        })
    } else {
        res.redirect("/");
    }
})

router.get("/:field/:id", async (req, res) => {
    const fieldName = req.params.field;
    const field = await Field.findOne({ name: fieldName });
    if (field) {
        const course = await Course.findById(req.params.id).lean();
        if (course) {
            return res.render("courses/show", {
                course: course,
                helpers: {
                    getDateString: (date) => {
                        const newDate = new Date(date);
                        // return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
                        const [hour, minute, second] = newDate.toLocaleTimeString("en-US").split(/:| /)
                        // return hour + "h : " + minute + "m : " + second + "s    " + newDate.toDateString();
                        return newDate.toTimeString();
                    }
                }
            })
        }
    }
    return res.redirect("/");
})

// router.get("/:field/:id", (req, res) => {
//     res.render("courses/show")
// })

module.exports = router;