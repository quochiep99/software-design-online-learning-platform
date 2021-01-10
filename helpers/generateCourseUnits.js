const converter = require('number-to-words');
const path = require("path");
module.exports = (course, currentLessonName, isPreviewMode) => {
    const curriculum = course.curriculum;
    if ((!curriculum) || (Object.keys(curriculum).length === 0 && curriculum.constructor === Object)) {
        return "No curriculum has been uploaded !!!"
    }

    var str = "";

    for (var i = 0; i < curriculum.children.length; i++) {
        const sectionName = curriculum.children[i].name;
        const sectionNumberInString = converter.toWords(i + 1);

        var isHiddenClass = "accordion-button collapsed";
        var ariaExpanded = "false";
        var isShown = "collapse"
        // Show the first lesson

        if (i === 0) {
            isHiddenClass = "accordion-button";
            isCollapsed = "true";
            isShown = "collapse show"
        }
        str += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${sectionNumberInString}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${sectionNumberInString}" aria-expanded="${ariaExpanded}"
                    aria-controls="flush-collapse${sectionNumberInString}">
                    <b>${sectionName}</b>
                </button>
            </h2>
            <div id="flush-collapse${sectionNumberInString}" class="accordion-collapse ${isShown}"
                aria-labelledby="flush-heading${sectionNumberInString}" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div class="list-group">
        `
        for (var j = 0; j < curriculum.children[i].children.length; j++) {
            const lessonName = path.parse(curriculum.children[i].children[j].name).name;
            if (currentLessonName === lessonName) {
                str += `                        
                <a href="/it/${course.field.name}/courses/${course._id}/learn/${lessonName}" class="list-group-item list-group-item-action list-group-item-success">                
                <input type="checkbox" class="form-check-input" id="exampleCheck1" name="${lessonName}">
                ${lessonName}</a>
                `
            } else {
                str += `                        
                <a href="/it/${course.field.name}/courses/${course._id}/learn/${lessonName}" class="list-group-item list-group-item-action">                
                <input type="checkbox" class="form-check-input" id="exampleCheck1" name="${lessonName}">
                ${lessonName}</a>
                `
            }
        }
        str += `
                    </div>
                </div>
            </div>
        </div>
        `
        if (isPreviewMode) {
            str = str.
                replace(/learn/g, "preview").
                replace(/class="form-check-input" id="exampleCheck1"/g, `class="form-check-input" id="exampleCheck1" style="display:none"`);
            break;
        }
    };
    return str;
}