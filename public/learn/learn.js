// Rating system
var starRatingStep = raterJs({
    starSize: 32,
    step: 0.1,
    element: document.querySelector("#rater-step"),
    rateCallback: function rateCallback(rating, done) {
        this.setRating(rating);
        done();
    },
    onHover: function (currentIndex, currentRating) {
        document.querySelector('#rating').value = currentIndex.toFixed(1);
    },
    onLeave: function (currentIndex, currentRating) {
        document.querySelector('#rating').value = currentRating.toFixed(1);
    }
});

// Save progress

document.querySelector("#saveProgressBtn").addEventListener("click", () => {
    document.querySelector("#progress").submit();
})

// Show course progress
var numLessons = document.querySelectorAll("a[href] > .form-check-input").length;
var numWatchedVideos = document.querySelectorAll("input[checked='checked']").length;
document.querySelector("div.alert > span").textContent = `${numWatchedVideos}/${numLessons}`;
