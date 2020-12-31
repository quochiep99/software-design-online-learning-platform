document.querySelectorAll(".owl-stage > div").forEach(e => {
    const courseRating = parseFloat(e.querySelector(".rating span").textContent);
    const element = e.querySelector(".ratingStar");
    var starRatingStep = raterJs({
        starSize: 32,
        step: 0.1,
        rating: courseRating,
        element: element,
        readOnly:true, 
        rateCallback: function rateCallback(rating, done) {
            this.setRating(rating);
            done();
        }
    });
})


