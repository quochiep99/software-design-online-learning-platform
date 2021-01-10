const Course = require("../models/course");
const Field = require("../models/field");
const models = {};
// courseData is an object including { title, subtitle, description, fieldName, instructor, image3xURL, discountPrice, originalPrice, curriculum, isComplete }
models.createCourse = async function (courseData) {
    var { title, subtitle, description, fieldName, instructor, image3xURL, discountPrice, originalPrice, curriculum, isComplete } = courseData;

    // Set 'unwatched' state for all units in the curriculum
    for (var i = 0; i < curriculum.children.length; i++) {
        for (var j = 0; j < curriculum.children[i].children.length; j++) {
            curriculum.children[i].children[j].isWatched = false;
        }
    }

    // Check whether the course content is complete
    isComplete = (isComplete === "on") ? true : false;

    fieldName = fieldName.toLowerCase().replace(/ /g, "-");
    var field = await Field.findOne({ name: fieldName });
    if (!field) {
        field = await Field.create({ name: fieldName });
    }

    // add course to db
    const newCourse = await new Course({
        title,
        subtitle,
        description,
        field,
        instructor,
        image3xURL,
        discountPrice,
        originalPrice,
        curriculum,
        isComplete
    }).save();

    // add course to instructor
    instructor.uploadedCourses.push(newCourse);
    await instructor.save();

    // add course to field
    field.courses.push(newCourse);
    await field.save();
}

models.editCourse = async function (courseId, courseData) {
    var { description, curriculum, isComplete } = courseData;
    const course = await Course.findById(courseId).
        populate("students");

    // Set 'unwatched' state for all units in the curriculum
    for (var i = 0; i < curriculum.children.length; i++) {
        for (var j = 0; j < curriculum.children[i].children.length; j++) {
            curriculum.children[i].children[j].isWatched = false;
        }
    }
    if (course) {
        // Retrieve all students of this course, update their curriculum progress        
        for (const student of course.students) {
            // Check duplicate course curriculum progress, overwrite duplicate 
            var alreadyExist = false;
            for (var i = 0; i < student.progress.length; i++) {
                if (student.progress[i].name === curriculum.name) {
                    alreadyExist = true;
                    student.progress[i] = curriculum;
                    break;
                }
            }
            // otherwise we add curriculum progress
            if (!alreadyExist) {
                student.progress.push(curriculum);
            }
            await student.save();
        }
        course.description = description;
        course.curriculum = curriculum;
        course.isComplete = (isComplete === "on") ? true : false;
        course.updatedAt = new Date();
        return await course.save();
    }
}
module.exports = models;