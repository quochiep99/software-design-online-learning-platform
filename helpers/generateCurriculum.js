const converter = require('number-to-words');
const path = require("path");
module.exports = (curriculum) => {
    var str = "";
    // If no curriculum is uploaded, then we use the default course curriculum
    if ((!curriculum) || ("defaultCurriculum" in curriculum) || (Object.keys(curriculum).length === 0 && curriculum.constructor === Object)) {
        curriculum = curriculum.defaultCurriculum;
        for (var i = 0; i < curriculum.length; i++) {
            const sectionName = curriculum[i].sectionName;
            const sectionNumberInString = converter.toWords(i + 1);

            var isHiddenClass = "collapse";
            var isCollapsed = "plus"
            // Show the first lesson        

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

            for (var j = 0; j < curriculum[i].unitNames.length; j++) {
                const lessonName = curriculum[i].unitNames[j];
                str += `
                <li><a class="video">${lessonName}</a></li>
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

    // Instructors have uploaded their curriculum
    for (var i = 0; i < curriculum.children.length; i++) {
        const sectionName = curriculum.children[i].name;
        const sectionNumberInString = converter.toWords(i + 1);

        var isHiddenClass = "collapse";
        var isCollapsed = "plus"
        // Show the first lesson        

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
            <li><a class="video">${lessonName}</a></li>
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