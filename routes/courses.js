const express = require("express");
const Course = require("../models/course");
const Field = require("../models/field");

const router = express.Router({
    mergeParams: true
});

router.get("/", async (req, res) => {
    const fieldName = req.params.field;
    const field = await Field.findOne({
        name: fieldName
    });
    if (field) {
        const query = req.query;
        const requestedPage = req.query.page || 1;
        const requestedLimit = parseInt(req.query.limit || 3);
        const options = {
            page: requestedPage,
            limit: requestedLimit,
            populate: ["field", "instructor", "reviews"],
        };
        if (query.ratingDescending === "on" && query.priceAscending === "on") {
            options.sort = {
                rating: -1,
                discountPrice: 1
            }
        } else {
            if (query.priceAscending === "on") {
                options.sort = {
                    discountPrice: 1
                }
            } else {
                options.sort = {
                    rating: -1
                }
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
        const course = await Course.findById(req.params.id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                },
            })
            .populate({
                path: "students"
            })
            .populate({
                path: "instructor",
            });

        if (course) {
            // increment views as users visit the course
            course.numViews++;
            await course.save();
            return res.render("courses/show", {
                course: course
            });
        }
    }
    res.redirect("/");
});

module.exports = router;