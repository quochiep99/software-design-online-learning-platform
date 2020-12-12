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
    const webDevelopmentCourses = await Field.
        findOne({ name: "web-development" }).
        populate("courses");

    const dataScienceCourses = await Field.
        findOne({ name: "data-science" }).
        populate("courses");

    const mobileDevelopmentCourses = await Field.
        findOne({ name: "mobile-development" }).
        populate("courses");

    const programmingLanguagesCourses = await Field.
        findOne({ name: "programming-languages" }).
        populate("courses");

    const gameDevelopmentCourses = await Field.
        findOne({ name: "game-development" }).
        populate("courses");

    const courses = [webDevelopmentCourses, dataScienceCourses, mobileDevelopmentCourses, programmingLanguagesCourses, gameDevelopmentCourses];

    // setting all views to 0    
    // for (var i = 0; i < courses.length; i++) {
    //     for (var j = 0; j < courses[i].courses.length; j++) {
    //         courses[i].courses[j].numViews = 0;
    //         await courses[i].courses[j].save();
    //     }
    // }
    // console.log("set all views to 0 !!!");

    for (var k = 1; k <= 10; k++) {
        var i = Math.floor(Math.random() * courses.length);
        var j = Math.floor(Math.random() * courses[i].courses.length);
        courses[i].courses[j].numViews++;
        await courses[i].courses[j].save();
    }
    console.log("random view counts set !!!");

    console.log("finished !!!");
}

seedDB();

