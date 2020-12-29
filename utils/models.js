const Course = require("../models/course");
const Field = require("../models/field");
const models = [];
// courseData is an object including { title, subtitle, description, field, instructor, image3xURL, discountPrice, originalPrice,curriculum }
models.createCourseSync = async function (courseData) {
    var { title, subtitle, description, fieldName, instructor, image3xURL, discountPrice, originalPrice, curriculum } = courseData;

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
        curriculum
    }).save();

    // add course to instructor
    instructor.uploadedCourses.push(newCourse);
    await instructor.save();

    // add course to field
    field.courses.push(newCourse);
    await field.save();


}
module.exports = models;