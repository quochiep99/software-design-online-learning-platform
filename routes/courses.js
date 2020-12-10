const express = require("express");
const Course = require("../models/course");
const Field = require("../models/field");
const moment = require('moment');

const router = express.Router({ mergeParams: true });


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
            res.render("courses/index", {
                totalPages: result.totalPages,
                courses: courses,
                helpers: {
                    getFieldName: (fieldName) => {
                        return fieldName.replace("-", " ");
                    },
                    generatePagination: (numPages) => {
                        var ret = "";
                        var previous = `<li class="left-etc"><a>&laquo;</a></li>`;
                        var next = `<li><a>&raquo;</a></li>`;

                        // if there is a previous page
                        if (result.hasPrevPage) {
                            previous = `<li class="left-etc"><a href="/courses/${field.name}/?page=${result.prevPage}&limit=${result.limit}">&laquo;</a></li>`
                        }
                        if (result.hasNextPage) {
                            next = `<li><a href="/courses/${field.name}/?page=${result.nextPage}&limit=${result.limit}">&raquo;</a></li>`;
                        }
                        for (var i = 1; i <= numPages; i++) {
                            if (i === result.page) {
                                // make the current page active
                                ret += `<li class="active"><span>${result.page}</span></li>\n`;
                            } else {
                                ret += `<li><a href="/courses/${field.name}/?page=${i}&limit=${result.limit}">${i}</a></li>\n`
                            }
                        }

                        return previous + "\n" + ret + next + "\n";
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
        const course = await Course.findById(req.params.id).
            populate({
                path: "reviews",
                populate: {
                    path: "author"
                }
            }).
            populate({ path: "students" });

        if (course) {
            return res.render("courses/show", {
                course: course,
                helpers: {
                    getLastUpdatedString: (date) => {
                        const newDate = new Date(date);
                        // return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
                        const [hour, minute, second] = newDate.toLocaleTimeString("en-US").split(/:| /)
                        // return hour + "h : " + minute + "m : " + second + "s    " + newDate.toDateString();
                        return newDate.toTimeString();
                    },
                    calculateDiscountPercentage: (discountPrice, originalPrice) => {
                        return (100 * (originalPrice - discountPrice) / originalPrice).toFixed(0);
                    },
                    calculateReviewTime: (date) => {
                        return moment(date).fromNow();
                    }


                }
            })
        }
    }
    res.redirect("/");


})

// router.get("/:field/:id", (req, res) => {
//     res.render("courses/show")
// })

module.exports = router;