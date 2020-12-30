const urlManipulator = require("../utils/url");
module.exports = (result, currentURL) => {
    var ret = "";
    var previous = `<li class="left-etc"><a>&laquo;</a></li>`
    if (result.hasPrevPage) {
        previous = `<li class="left-etc"><a href=${currentURL.replace(`page=${result.page}`, `page=${result.prevPage}`)}>&laquo;</a></li>`
    }
    ret += previous;
    for (var i = 1; i <= result.totalPages; i++) {
        var pageHref = ""
        if (!currentURL.includes("page")) {
            // add query string
            pageHref = urlManipulator.addParameterToURL(currentURL, "page", i);
        } else {
            pageHref = urlManipulator.removeParameterFromURL(currentURL, "page");
            pageHref = urlManipulator.addParameterToURL(pageHref, "page", i);
        }
        // make the current page active and remove its href to make it unclickable since we are on this page
        if (i === result.page) {
            ret += `<li class="active"><a>${i}</a></li>`
        } else {
            ret += `<li><a href=${pageHref}>${i}</a></li>`
        }
    }
    var next = `<li><a>&raquo;</a></li>`;
    if (result.hasNextPage) {
        next = `<li><a href=${currentURL.replace(`page=${result.page}`, `page=${result.nextPage}`)}>&raquo;</a></li>`;
    }
    ret += next;
    return ret;
}