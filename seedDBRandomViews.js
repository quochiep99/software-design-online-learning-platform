const Course = require("./models/course");
const User = require("./models/user");
const Review = require("./models/review");
const Field = require("./models/field");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// mongodb url
const url =
    process.env.DATABASEURL || "mongodb://localhost:27017/web-online-academy";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDB() {

    const courses = await Course.find({});
    const fields = await Field.find({});

    // setting all views to 0
    for (var k = 1; k <= 10; k++) {
        courses[k].numViews = 0;
    }
    console.log("numViews set to 0");
    for (var k = 1; k <= 10000; k++) {
        var i = Math.floor(Math.random() * courses.length);
        courses[i].numViews++;
        await courses[i].save();
    }

    console.log("finished !!!");

    // for (var i = 0; i < fields.length; i++) {
    //     fields[i].totalStudents = 0;
    //     await fields[i].calculateTotalStudents();
    //     await fields[i].save();
    // }



}

seedDB();

