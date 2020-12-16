function removeParameterFromURL(url, parameter) {
    return url
        .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
        .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}

function addParameterToURL(url, key, value) {
    return url += (url.match(/[\?]/g) ? '&' : '?') + `${key + "=" + value}`;
}
function containKeyInURL(key) {
    return new RegExp(`[?&]${key}=`).test(location.search)
}
var ratingDescendingCheckBox = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[0]
var priceAscendingCheckBox = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[1]

var ratingDescendingLabel = document.querySelectorAll("div.filter_type li > label")[0]
var priceAscendingLabel = document.querySelectorAll("div.filter_type li > label")[1]

var currentURL = window.location.href;
var newURL = "";
if (ratingDescendingCheckBox && priceAscendingCheckBox && ratingDescendingLabel && priceAscendingLabel) {
    // remove the trailing '/'
    while (currentURL[currentURL.length - 1] === "/") {
        currentURL = currentURL.slice(0, -1);
    }

    [ratingDescendingCheckBox.querySelector("ins"), ratingDescendingLabel].forEach(function (e) {
        e.addEventListener("click", () => {
            if (!currentURL.includes("ratingDescending")) {
                ratingDescendingCheckBox.classList.remove("checked");
                // add query string
                newURL = addParameterToURL(currentURL, "ratingDescending", "on");
            } else {
                newURL = removeParameterFromURL(currentURL, "ratingDescending");
            }
            window.location.href = newURL
        })
    })

    if (currentURL.includes("ratingDescending")) {
        ratingDescendingCheckBox.classList.add("checked");
    }

    [priceAscendingCheckBox.querySelector("ins"), priceAscendingLabel].forEach(function (e) {
        e.addEventListener("click", () => {
            if (!currentURL.includes("priceAscending")) {
                priceAscendingCheckBox.classList.remove("checked");
                // add query string
                newURL = addParameterToURL(currentURL, "priceAscending", "on");
            } else {
                newURL = removeParameterFromURL(currentURL, "priceAscending");
            }
            window.location.href = newURL
        })
    })

    if (currentURL.includes("priceAscending")) {
        priceAscendingCheckBox.classList.add("checked");
    }
}




