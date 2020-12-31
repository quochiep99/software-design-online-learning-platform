const Course = require("../models/course");
const User = require("../models/user");
const Review = require("../models/review");
const Field = require("../models/field");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const JoinJSON = require("join-json");



// mongodb url
const url =
    process.env.DATABASEURL || "mongodb://localhost:27017/web-online-academy";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const coursesData = [
    (joinjson) => {
        // field: web-development
        for (var i = 1; i <= 16; i++) {
            joinjson.join([require(`../data/web-development/data${i}.json`)]);
        }
    },
    (joinjson) => {
        //  field: mobile-development
        for (var i = 1; i <= 16; i++) {
            joinjson.join([require(`../data/mobile-development/data${i}.json`)]);
        }
    },
    (joinjson) => {
        //  field: programming-languages
        for (var i = 1; i <= 16; i++) {
            joinjson.join([require(`../data/programming-languages/data${i}.json`)]);
        }
    },
    (joinjson) => {
        //  field: data-science
        for (var i = 1; i <= 16; i++) {
            joinjson.join([require(`../data/data-science/data${i}.json`)]);
        }
    },
    (joinjson) => {
        //  field: game-development
        for (var i = 1; i <= 16; i++) {
            joinjson.join([require(`../data/game-development/data${i}.json`)]);
        }
    }
];

async function seedDB() {
    // // delete db
    // await (async () => {
    //     console.log("deleting collections documents...");
    //     await Course.deleteMany({});
    //     await User.deleteMany({});
    //     await Review.deleteMany({});
    //     await Field.deleteMany({});
    //     console.log("deleted collections documents.");
    // })();


    // // ef is element function in the array of functions
    // var dataNumber = 0;
    // for (const ef of coursesData) {
    //     const joinjson = new JoinJSON();
    //     ef(joinjson);
    //     dataNumber++;
    //     console.log(`creating collections documents ${dataNumber}...`);
    //     const data = joinjson.joined;

    //     for (var i = 0; i < 16; i++) {
    //         var field = await Field.findOne({ name: data[i].field.name });
    //         if (!field) {
    //             field = await Field.create(data[i].field);
    //         }

    //         var course = await Course.create(data[i].course);

    //         var reviews = await Review.create(data[i].reviews);

    //         var students = [];

    //         for (var j = 0; j < data[i].students.length; j++) {
    //             if (!(await User.findOne({ email: data[i].students[j].email }))) {
    //                 const salt = await bcrypt.genSalt(10);
    //                 // store the hashed password to db
    //                 data[i].students[j].password = await bcrypt.hash(
    //                     data[i].students[j].password,
    //                     salt
    //                 );
    //                 students.push(await new User(data[i].students[j]).save());
    //             }
    //         }

    //         var instructor = await User.findOne({ email: data[i].instructor.email });
    //         if (!instructor) {
    //             const salt = await bcrypt.genSalt(10);
    //             // store the hashed password to db
    //             data[i].instructor.password = await bcrypt.hash(data[i].instructor.password, salt);
    //             instructor = await User.create(data[i].instructor);
    //         }

    //         // setting relationships between collections
    //         field.courses.push(course);
    //         field = await field.save();

    //         course.field = field;
    //         course.instructor = instructor;
    //         course.reviews = reviews;
    //         // re-calculate the course's average rating
    //         course.calculateAverageRating(() => { });
    //         course.students = students;
    //         course.totalStudents = students.length;
    //         field.totalStudents += students.length;
    //         course = await course.save();
    //         field = await field.save();

    //         instructor.uploadedCourses.push(course);
    //         instructor = await instructor.save();

    //         for (var j = 0; j < students.length; j++) {
    //             students[j].enrolledCourses.push(course);
    //             await students[j].save();
    //         }

    //         students = await User.find({ role: "s" });

    //         for (var j = 0; j < reviews.length; j++) {
    //             reviews[j].author = students[j];
    //             await reviews[j].save();
    //         }
    //         reviews = await Review.find({});

    //         console.log(`created ${i + 1}th collections document.`);
    //     }
    // }

    // Generate random prices additions and updated dates
    const courses = await Course.find({});
    for (const course of courses) {
        course.originalPrice = 109.99;
        course.originalPrice += Math.floor(Math.random() * 110 + 1);
        course.originalPrice = course.originalPrice.toFixed(2);

        course.discountPrice = 10.99;
        course.discountPrice += Math.floor(Math.random() * 20 + 1);
        course.discountPrice = course.discountPrice.toFixed(2);

        course.numViews = Math.floor(Math.random() * 1001)
        course.updatedAt = new Date();
        course.updatedAt.setDate(course.updatedAt.getDate() - Math.floor(Math.random() * 11 + 2));
        await course.save();
    }
    const fields = await Field.find({});
    for (const field of fields) {
        field.updatedAt = new Date();
        field.updatedAt.setDate(field.updatedAt.getDate() - Math.floor(Math.random() * 11 + 2));
        await field.save();
    }



    console.log("finished !!!");
}

seedDB();


