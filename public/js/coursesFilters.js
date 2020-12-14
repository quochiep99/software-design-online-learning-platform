var filters = document.querySelector("#collapseFilters");
var ratingDescendingBox = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[0];
var priceAscending = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[1];

document.querySelector("button.btn_1").addEventListener("click", () => {

    if (ratingDescendingBox.classList.contains("checked") && priceAscending.classList.contains("checked")) {
        filters.action += "?" + ratingDescendingBox.parentNode.innerText[0].toLowerCase() + ratingDescendingBox.parentNode.innerText.replace(" ", "").slice(1) + "=on"
            + "&" + priceAscending.parentNode.innerText[0].toLowerCase() + priceAscending.parentNode.innerText.replace(" ", "").slice(1) + "=on"
    } else {
        if (ratingDescendingBox.classList.contains("checked")) {
            filters.action += "?" + ratingDescendingBox.parentNode.innerText[0].toLowerCase() + ratingDescendingBox.parentNode.innerText.replace(" ", "").slice(1) + "=on";
        } else {
            filters.action += "?" + priceAscending.parentNode.innerText[0].toLowerCase() + priceAscending.parentNode.innerText.replace(" ", "").slice(1) + "=on";
        }
    }

})