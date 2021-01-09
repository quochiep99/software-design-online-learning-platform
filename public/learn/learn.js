var starRatingStep = raterJs({
    starSize: 32,
    step: 0.1,
    element: document.querySelector("#rater-step"),
    rateCallback: function rateCallback(rating, done) {
        this.setRating(rating);
        done();
    },
    onHover: function (currentIndex, currentRating) {
        document.querySelector('.live-rating').textContent = currentIndex.toFixed(1);
    },
    onLeave: function (currentIndex, currentRating) {
        document.querySelector('.live-rating').textContent = currentRating.toFixed(1);
    }
});
