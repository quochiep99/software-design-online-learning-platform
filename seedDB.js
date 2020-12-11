const Course = require("./models/course")
const User = require("./models/user")
const Review = require("./models/review")
const Field = require("./models/field")
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const data = require("./data");
// mongodb url
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/web-online-academy';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDB() {
    console.log("deleting collections documents...");
    await Course.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    await Field.deleteMany({});
    console.log("deleted collections documents.")
    console.log("creating collections documents...")

    var field = await Field.findOne({ field: data.field.name });
    if (!field) {
        field = await Field.create(data.field);
    }

    var course = await Course.create(data.course);

    for (var i = 0; i < data.reviews.length; i++) {
        await new Review(data.reviews[i]).save();
    }
    var reviews = await Review.find({});

    for (var i = 0; i < data.students.length; i++) {
        if (! await User.findOne({ email: data.students[i].email })) {
            await new User(data.students[i]).save();
        }
    }
    var students = await User.find({});

    var instructor = await User.findOne({ email: data.instructor.email });
    if (!instructor) {
        instructor = await User.create(data.instructor);
    }

    console.log("created collections documents.");


    // setting relationships between collections
    field.courses.push(course);
    field = await field.save();

    course.field = field;
    course.instructor = instructor;
    course.reviews = reviews;
    // re-calculate the course's average rating 
    course.calculateAverageRating(() => { });
    course.students = students;
    course = await course.save();

    instructor.uploadedCourses.push(course);
    instructor = await instructor.save();

    for (var i = 0; i < students.length; i++) {
        students[i].enrolledCourses.push(course);
        await students[i].save();
    }

    students = await User.find({ role: "s" });

    for (var i = 0; i < reviews.length; i++) {
        reviews[i].author = students[i];
        await reviews[i].save();
    }
    reviews = await Review.find({});



}

seedDB();