// Most featured courses
document.querySelectorAll("#reccomended .owl-stage > div").forEach(e => {
    const courseRating = parseFloat(e.querySelector(".rating span").textContent);
    const element = e.querySelector(".ratingStar");
    raterJs({
        starSize: 16,
        step: 0.1,
        rating: courseRating,
        element: element,
        readOnly: true,
        rateCallback: function rateCallback(rating, done) {
            this.setRating(rating);
            done();
        }
    });
});

// Most viewed and recent courses
["#landingMostViewedCourses", "#landingMostRecentCourses"].forEach(elementId => {
    document.querySelectorAll(`${elementId} > div`).forEach(e => {
        const courseRating = parseFloat(e.querySelector(".rating span").textContent);
        const element = e.querySelector(".ratingStar");
        raterJs({
            starSize: 16,
            step: 0.1,
            rating: courseRating,
            element: element,
            readOnly: true,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                done();
            }
        });
    })
})

// course show page
if (document.querySelector(".jumbotron.text-left span")) {
    raterJs({
        starSize: 16,
        step: 0.1,
        rating: parseFloat(document.querySelector(".jumbotron.text-left span").textContent),
        element: document.querySelector("#showCourse"),
        readOnly: true,
        rateCallback: function rateCallback(rating, done) {
            this.setRating(rating);
            done();
        }
    });
}


// uploadedCourses page
if (document.querySelector("#uploadedCoursesRating")) {
    document.querySelectorAll("#uploadedCoursesRating > div").forEach(e => {
        raterJs({
            starSize: 16,
            step: 0.1,
            rating: parseFloat(e.querySelector("span").textContent),
            element: e.querySelector(".ratingStar"),
            readOnly: true,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                done();
            }
        });
    })
}

// enrolledCourses page
if (document.querySelector("#enrolledCoursesRating")) {
    document.querySelectorAll("#enrolledCoursesRating > div").forEach(e => {
        raterJs({
            starSize: 16,
            step: 0.1,
            rating: parseFloat(e.querySelector("span").textContent),
            element: e.querySelector(".ratingStar"),
            readOnly: true,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                done();
            }
        });
    })
}

// wishlistedCourses page
if (document.querySelector("#wishlistedCoursesRating")) {
    document.querySelectorAll("#wishlistedCoursesRating > div").forEach(e => {
        raterJs({
            starSize: 16,
            step: 0.1,
            rating: parseFloat(e.querySelector("span").textContent),
            element: e.querySelector(".ratingStar"),
            readOnly: true,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                done();
            }
        });
    })
}

// courses/index.hbs page
if (document.querySelector("#list_sidebar")) {
    document.querySelectorAll("#list_sidebar > div").forEach(e => {
        raterJs({
            starSize: 16,
            step: 0.1,
            rating: parseFloat(e.querySelector(".rating span").textContent),
            element: e.querySelector(".ratingStar"),
            readOnly: true,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                done();
            }
        });
    })
}

// show.hbs page/recommended courses section
if (document.querySelector("#recommendedCourses")) {
    document.querySelectorAll("#recommendedCourses > div").forEach(e => {
        raterJs({
            starSize: 16,
            step: 0.1,
            rating: parseFloat(e.querySelector(".rating span").textContent),
            element: e.querySelector(".ratingStar"),
            readOnly: true,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                done();
            }
        });
    })
}

// show.hbs page/reviews section
if (document.querySelector("#reviewRatings")) {
    document.querySelectorAll("#reviewRatings > div").forEach(e => {
        raterJs({
            starSize: 16,
            step: 0.1,
            rating: parseFloat(e.querySelector(".rating span").textContent),
            element: e.querySelector(".ratingStar"),
            readOnly: true,
            rateCallback: function rateCallback(rating, done) {
                this.setRating(rating);
                done();
            }
        });
    })
}

// Track, toggle course status
document.querySelectorAll(".enrolledCourseStatus").forEach(e => {
    e.addEventListener("click", () => {
        const courseId = e.id;
        $.post("/my-courses/status",
            {
                courseId: courseId
            },
            (data, status) => {
                if (status === "success") {
                    e.children[0].textContent = "Completed"
                    e.children[0].style.color = "#fff";
                    e.children[0].style.background = "#662d91";
                }

            }
        )
    })
})