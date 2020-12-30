const urlManipulator = require("../utils/url");
const moment = require("moment");
const path = require("path");
var converter = require('number-to-words');


const helpers = [];
helpers.getTimeAgo = (date) => {
    return moment(date).fromNow();
};

helpers.getLastUpdatedString = (date) => {
    const newDate = new Date(date);
    // return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
    const [hour, minute, second] = newDate.toLocaleTimeString("en-US").split(/:| /);
    // return hour + "h : " + minute + "m : " + second + "s    " + newDate.toDateString();
    return newDate.toTimeString();
};

helpers.calculateDiscountPercentage = (discountPrice, originalPrice) => {
    return ((100 * (originalPrice - discountPrice)) / originalPrice).toFixed(0);
};

// function to convert i.e. 'web-development' into 'Web Development'
helpers.getFieldName = (fieldName) => {
    return fieldName.replace("-", " ").replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
};
helpers.generatePagination = (result, currentURL) => {
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
};

helpers.generateBestSeller = (totalStudents, options) => {
    if (totalStudents >= 13) {
        return options.fn();
    }
};
helpers.generateNew = (updatedAt, options) => {
    const today = new Date();
    const date = new Date(updatedAt);
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // if the last updated day is within last 3 days
    if (diffDays <= 3) {
        return options.fn();
    }
}
helpers.generateProfileOptions = (currentUser) => {
    if (!currentUser) {
        return;
    }
    // if currentUser is a student
    if (currentUser.role === "s") {
        return `
        <li><span><a href="#">Student</a></span>
                        <ul>                            
                            <li><a href="/my-courses/learning">All enrolled courses</a></li>
                            <li><a href="/my-courses/wishlist">Wishlist</a></li>
                        </ul>
                    </li>
        `
    } else if (currentUser.role === "i") {
        // if currentUser is an instructor
        return `
        <li><span><a href="#">Instructor</a></span>
                        <ul>
                            <li><a href="/courses/new">New course</a></li>
                            <li><a href="#">View uploaded courses</a></li>                            
                        </ul>
                    </li>
        `
    }

}

helpers.generateCurriculum = (curriculum) => {
    var str = "";
    for (var i = 0; i < curriculum.children.length; i++) {
        const sectionName = curriculum.children[i].name;
        const sectionNumberInString = converter.toWords(i + 1);

        var isHiddenClass = "collapse";
        var isCollapsed = "plus"
        // Show the first lesson
        // const isCollapsed= (i===0) ? 

        if (i === 0) {
            isHiddenClass = "collapse show";
            isCollapsed = "minus"
        }
        str += `
        <div class="card">
        <div class="card-header" role="tab" id="heading${sectionNumberInString}">
            <h5 class="mb-0">
                <a data-toggle="collapse" href="#collapse${sectionNumberInString}" aria-expanded="true"
                    aria-controls="collapse${sectionNumberInString}"><i class="indicator ti-${isCollapsed}"></i>${sectionName}</a>
            </h5>
        </div>

        <div id="collapse${sectionNumberInString}" class="${isHiddenClass}" role="tabpanel" aria-labelledby="heading${sectionNumberInString}"
            data-parent="#accordion_lessons">
            <div class="card-body">
                <div class="list_lessons">
                    <ul>
                    `

        for (var j = 0; j < curriculum.children[i].children.length; j++) {
            const lessonName = path.parse(curriculum.children[i].children[j].name).name;
            str += `
            <li><a href="https://www.youtube.com/watch?v=LDgd_gUcqCw"
                            class="video">${lessonName}</a></li>
            `
        }
        str += `
        </ul>
                </div>
            </div>
        </div>
    </div>
        `
    }
    return str;
}

helpers.isInstructor = (user, course, options) => {
    if (user && user.role === "i") {
        return options.fn({ course });
    }
}

module.exports = helpers;