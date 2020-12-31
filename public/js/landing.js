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

// enrolledCourses page
if (document.querySelector("#enrolledCoursesRating span")) {
    raterJs({
        starSize: 16,
        step: 0.1,
        rating: parseFloat(document.querySelector("#enrolledCoursesRating span").textContent),
        element: document.querySelector("#enrolledCoursesRater"),
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