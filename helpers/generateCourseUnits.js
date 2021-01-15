const converter = require('number-to-words');
const path = require("path");
module.exports = (course, curriculum, currentLessonName, isPreviewMode) => {
    var str = "";
    // If no curriculum is uploaded, then we use the default course curriculum
    if ((!curriculum) || ("defaultCurriculum" in curriculum) || (Object.keys(curriculum).length === 0 && curriculum.constructor === Object)) {
        curriculum = curriculum.defaultCurriculum;
        for (var i = 0; i < curriculum.length; i++) {
            const sectionName = curriculum[i].sectionName;
            const sectionNumberInString = converter.toWords(i + 1);
            str += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${sectionNumberInString}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse${sectionNumberInString}" aria-expanded="false"
                        aria-controls="flush-collapse${sectionNumberInString}">
                        <b>${sectionName}</b>
                    </button>
                </h2>
                <div id="flush-collapse${sectionNumberInString}" class="accordion-collapse collapse"
                    aria-labelledby="flush-heading${sectionNumberInString}" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="list-group">
            `
            for (var j = 0; j < curriculum[i].unitNames.length; j++) {
                const lessonName = curriculum[i].unitNames[j];
                str += `                        
                    <a href="#" class="list-group-item list-group-item-action">                
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">${lessonName}</a>
                    `
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



    // Instructors have uploaded their curriculum
    for (var i = 0; i < curriculum.children.length; i++) {
        const sectionName = curriculum.children[i].name;
        const sectionNumberInString = converter.toWords(i + 1);
        str += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${sectionNumberInString}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${sectionNumberInString}" aria-expanded="false"
                    aria-controls="flush-collapse${sectionNumberInString}">
                    <b>${sectionName}</b>
                </button>
            </h2>
            <div id="flush-collapse${sectionNumberInString}" class="accordion-collapse collapse"
                aria-labelledby="flush-heading${sectionNumberInString}" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div class="list-group">
        `
        for (var j = 0; j < curriculum.children[i].children.length; j++) {
            const lessonName = path.parse(curriculum.children[i].children[j].name).name;
            const isChecked = (curriculum.children[i].children[j].isWatched === true) ? `checked="checked"` : ``;
            if (currentLessonName === lessonName) {
                str = str.replace(`<div id="flush-collapse${sectionNumberInString}" class="accordion-collapse collapse"`,
                    `<div id="flush-collapse${sectionNumberInString}" class="accordion-collapse collapse show"`);

                str += `                        
                <a href="/it/${course.field.name}/courses/${course._id}/learn/${lessonName}" class="list-group-item list-group-item-action list-group-item-success">                
                <input type="checkbox" class="form-check-input" id="exampleCheck1" name="${lessonName}" ${isChecked}>
                ${lessonName}</a>
                `
            } else {
                str += `                        
                <a href="/it/${course.field.name}/courses/${course._id}/learn/${lessonName}" class="list-group-item list-group-item-action">                
                <input type="checkbox" class="form-check-input" id="exampleCheck1" name="${lessonName}" ${isChecked}>
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