const Course = require("./models/course")
const User = require("./models/user")
const Review = require("./models/review")
const Field = require("./models/field")
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
// const data = require("./data");
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
    console.log("creating collections documents...");
    const data = [];
    for (var i = 1; i <= 16; i++) {
        data.push(require(`./data/data${i}`));
    }

    for (var i = 0; i < 16; i++) {

        var field = await Field.findOne({ name: data[i].field.name });
        if (!field) {
            field = await Field.create(data[i].field);
        }

        var course = await Course.create(data[i].course);

        var reviews = await Review.create(data[i].reviews);

        // for (var i = 0; i < data[i].reviews.length; i++) {
        //     await new Review(data[i].reviews[i]).save();
        // }
        // var reviews = await Review.find({});

        var students = [];

        for (var j = 0; j < data[i].students.length; j++) {
            if (! await User.findOne({ email: data[i].students[j].email })) {
                students.push(await new User(data[i].students[j]).save());
            }
        }        

        var instructor = await User.findOne({ email: data[i].instructor.email });
        if (!instructor) {
            instructor = await User.create(data[i].instructor);
        }

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

        for (var j = 0; j < students.length; j++) {
            students[j].enrolledCourses.push(course);
            await students[j].save();
        }

        students = await User.find({ role: "s" });

        for (var j = 0; j < reviews.length; j++) {
            reviews[j].author = students[j];
            await reviews[j].save();
        }
        reviews = await Review.find({});

        console.log(`created ${i+1}th collections document.`);

    }

    console.log("finished !!!")


}

seedDB();