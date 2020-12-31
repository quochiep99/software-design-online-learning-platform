// Most featured courses
document.querySelectorAll(".owl-stage > div").forEach(e => {
    const courseRating = parseFloat(e.querySelector(".rating span").textContent);
    const element = e.querySelector(".ratingStar");
    var starRatingStep = raterJs({
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

// Most viewed and recent courses
for (var i = 4; i <= 5; i++) {
    document.querySelectorAll(`div:nth-of-type(${i}) > .row > div`).forEach(e => {
        const courseRating = parseFloat(e.querySelector(".rating span").textContent);
        const element = e.querySelector(".ratingStar");
        var starRatingStep = raterJs({
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
}