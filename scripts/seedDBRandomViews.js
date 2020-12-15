const Course = require("../models/course");
const User = require("../models/user");
const Review = require("../models/review");
const Field = require("../models/field");
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
    // for (var k = 1; k <= 10; k++) {
    //     courses[k].numViews = 0;
    // }
    // console.log("Setting numViews to 0.....");
    // for (var k = 1; k <= 10000; k++) {
    //     var i = Math.floor(Math.random() * courses.length);
    //     courses[i].numViews++;
    //     await courses[i].save();
    // }

    // console.log("finished !!!");

    // const brendinSwanepoel = await User.findOne({ name: "Brendin Swanepoel" });
    // const theModernPython3Bootcamp = await Course.findOne({ title: "The Modern Python 3 Bootcamp" });
    // theModernPython3Bootcamp.students.push(brendinSwanepoel);
    // brendinSwanepoel.enrolledCourses.push(theModernPython3Bootcamp);
    // await theModernPython3Bootcamp.save();
    // await brendinSwanepoel.save();

}

seedDB();

