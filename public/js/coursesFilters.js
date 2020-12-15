var ratingDescendingCheckBox = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[0]
var priceAscendingCheckBox = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[1]

var ratingDescending = document.querySelectorAll("div.filter_type li > label")[0]
var priceAscending = document.querySelectorAll("div.filter_type li > label")[1]

var isRatingDescendingCheckBoxChecked = false;
var isPriceAscendingCheckBoxChecked = false;


ratingDescendingCheckBox.querySelector("ins").addEventListener("click", () => {
    if (window.location.href.indexOf("&ratingDescending=on") < 0) {
        ratingDescendingCheckBox.classList.remove("checked");
        window.location.href += "&ratingDescending=on"
    } else {
        window.location.href = window.location.href.replace("&ratingDescending=on", "");
    }
})
ratingDescending.addEventListener("click", () => {
    if (window.location.href.indexOf("&ratingDescending=on") < 0) {
        ratingDescendingCheckBox.classList.remove("checked");
        window.location.href += "&ratingDescending=on"
    } else {
        window.location.href = window.location.href.replace("&ratingDescending=on", "");
    }
})
if (window.location.href.indexOf("&ratingDescending=on") > 0) {
    ratingDescendingCheckBox.classList.add("checked");    
}

priceAscendingCheckBox.querySelector("ins").addEventListener("click", () => {
    if (window.location.href.indexOf("&priceAscending=on") < 0) {
        window.location.href += "&priceAscending=on"        
        priceAscendingCheckBox.classList.remove("checked");
    } else {
        window.location.href = window.location.href.replace("&priceAscending=on", "");
    }
})

priceAscending.addEventListener("click", () => {
    if (window.location.href.indexOf("&priceAscending=on") < 0) {
        window.location.href += "&priceAscending=on"        
        priceAscendingCheckBox.classList.remove("checked");
    } else {
        window.location.href = window.location.href.replace("&priceAscending=on", "");
    }
})

if (window.location.href.indexOf("&priceAscending=on") > 0) {
    priceAscendingCheckBox.classList.add("checked");
}