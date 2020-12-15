var ratingDescendingCheckBox = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[0]
var priceAscendingCheckBox = document.querySelectorAll("div.filter_type li .icheckbox_square-grey")[1]

var ratingDescendingLabel = document.querySelectorAll("div.filter_type li > label")[0]
var priceAscendingLabel = document.querySelectorAll("div.filter_type li > label")[1]

var currentURL = window.location.href;
var newURL = "";
// remove the trailing '/'
while (currentURL[currentURL.length - 1] === "/") {
    currentURL = currentURL.slice(0, -1);
}

[ratingDescendingCheckBox.querySelector("ins"), ratingDescendingLabel].forEach(function (e) {
    e.addEventListener("click", () => {
        var query = `${ratingDescendingCheckBox.children[0].name}=on`;
        // if no query has been made then we append ? to the url
        if (!currentURL.includes("?")) {
            newURL = `${currentURL + "?" + query}`
        } else {
            // if there's a query but does not contain priceAscending=...
            if (!currentURL.includes(query)) {
                ratingDescendingCheckBox.classList.remove("checked");
                newURL = `${currentURL + "&" + query}`
            } else {
                // if there's a query and it contains priceAscending=...
                newURL = currentURL.replace(query, "").replace("?&", "?");
                if (newURL[newURL.length - 1] === "&") {
                    newURL = newURL.slice(0, -1);
                }
            }
        }
        window.location.href = newURL
    })
})

if (currentURL.includes("ratingDescending=on")) {
    ratingDescendingCheckBox.classList.add("checked");
}

[priceAscendingCheckBox.querySelector("ins"), priceAscendingLabel].forEach(function (e) {
    e.addEventListener("click", () => {
        var query = `${priceAscendingCheckBox.children[0].name}=on`;
        // if no query has been made then we append ? to the url
        if (!currentURL.includes("?")) {
            newURL = `${currentURL + "?" + query}`
        } else {
            // if there's a query but does not contain priceAscending=...
            if (!currentURL.includes(query)) {
                priceAscendingCheckBox.classList.remove("checked");
                newURL = `${currentURL + "&" + query}`
            } else {
                // if there's a query and it contains priceAscending=...
                newURL = currentURL.replace(query, "").replace("?&", "?");
                if (newURL[newURL.length - 1] === "&") {
                    newURL = newURL.slice(0, -1);
                }
            }
        }
        window.location.href = newURL
    })
})

if (currentURL.includes("priceAscending=on")) {
    priceAscendingCheckBox.classList.add("checked");
}