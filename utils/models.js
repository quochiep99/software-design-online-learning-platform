const Course = require("../models/course");
const Field = require("../models/field");
const models = {};
// courseData is an object including { title, subtitle, description, fieldName, instructor, image3xURL, discountPrice, originalPrice, curriculum, isComplete }
models.createCourse = async function (courseData) {
    var { title, subtitle, description, fieldName, instructor, image3xURL, discountPrice, originalPrice, curriculum, isComplete } = courseData;

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
    const course = await Course.findById(courseId);
    if (course) {
        course.description = description;
        course.curriculum = curriculum;
        course.isComplete = (isComplete === "on") ? true : false;
        course.updatedAt = new Date();
        return await course.save();
    }
}
module.exports = models;