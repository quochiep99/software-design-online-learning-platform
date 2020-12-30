const converter = require('number-to-words');
const path = require("path");
module.exports = (curriculum) => {
    if ((!curriculum) || (Object.keys(curriculum).length === 0 && curriculum.constructor === Object)) {
        return "No curriculum has been uploaded !!!"
    }

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