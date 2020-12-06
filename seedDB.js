const Course = require("./models/course")
const User = require("./models/user")
const Review = require("./models/review")
const Field = require("./models/field")
const course = require("./models/course")
const field = require("./models/field")

const users = [
    // user 0
    {
        name: "Colt Steele",
        email: "coltsteele@gmail.com",
        password: "coltsteele",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // user 1
    {
        name: "Jonas Schmedtmann",
        email: "jonasschmedtmann@gmail.com",
        password: "jonasschmedtmann",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // user 2
    {
        name: "Dr. Angela Yu",
        email: "dr.angelayu@gmail.com",
        password: "dr.angelayu",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    },
    // user 3
    {
        name: "Rob Percival",
        email: "robpercival@gmail.com",
        password: "robpercival",
        role: "i",
        wishList: [],
        enrolledCourses: [],
        uploadedCourses: []
    }
]


const courses = [
    // course 0
    {
        title: "The Web Developer Bootcamp 2020",
        subtitle: "JUST COMPLETELY REDONE - The only course you need to learn web development - HTML, CSS, JS, Node, and More!",
        descriptions: [
            "COMPLETELY REDONE ON OCTOBER 12th 2020, WITH OVER 500 BRAND NEW VIDEOS!",
            "Hi! Welcome to the brand new version of The Web Developer Bootcamp, Udemy's most popular web development course.  This course was just completely overhauled to prepare students for the 2021 job market, with over 60 hours of brand new content. This is the only course you need to learn web development. There are a lot of options for online developer training, but this course is without a doubt the most comprehensive and effective on the market.  Here's why:"
        ],

        // field: "",
        // instructor: "",
        reviews: [],
        rating: 4.7,
        students: [],
        courseImage: "",
        cost: 129.99,
        numViews: 0,
        curriculum: [
            "1. Course Orientation",
            "2. An Introduction to Web Development"
        ]
    },
    // course 1
    {
        title: "The Complete JavaScript Course 2020: From Zero to Expert!",
        subtitle: "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
        descriptions: [
            "*** The #1 bestselling JavaScript course on Udemy! ***",
            "*** Completely re-built from scratch in October 2020 (65 hours video) ***"
        ],

        // field: "",
        // instructor: "",
        reviews: [],
        rating: 4.7,
        students: [],
        courseImage: "",
        cost: 129.99,
        numViews: 0,
        curriculum: [
            "1. Welcome, Welcome, Welcome!",
            "2. JavaScript Fundamentals – Part 1"
        ]

    },
    // course 2
    {
        title: "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp",
        subtitle: "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!",
        descriptions: [
            "Welcome to the Complete iOS App Development Bootcamp. With over 39,000 5 star ratings and a 4.8 average my iOS course is the HIGHEST RATED iOS Course in the history of Udemy!",
            "At 55+ hours, this iOS 13 course is the most comprehensive iOS development course online!"
        ],

        // field: "",
        // instructor: "",
        reviews: [],
        rating: 4.8,
        students: [],
        courseImage: "",
        cost: 129.99,
        numViews: 0,
        curriculum: [
            "1. Getting Started with iOS 13 and Swift 5.1",
            "2. Xcode Storyboards and Interface Builder"
        ]

    },
    // course 3
    {
        title: "The Complete Android N Developer Course",
        subtitle: "Learn Android App Development with Android 7 Nougat by building real apps including Uber, Whatsapp and Instagram!",
        descriptions: [
            "Please note support for this course has now stopped, and that there is a newer version of the course (The Complete Android Oreo Developer Course) available.",
            "In this Android N version of the course I use Android Studio versions 2.0 and 2.1.2, and recommend students do the same."
        ],

        // field: "",
        // instructor: "",
        reviews: [],
        rating: 4.4,
        students: [],
        courseImage: "",
        cost: 129.99,
        numViews: 0,
        curriculum: [
            "1. What Does The Course Cover?",
            "2. Introduction To Android Studio"
        ]

    }
]

const reviews = [
    // review 0
    {
        body: "Being a fresher as a web developer this course helped me not only to understand web coding in such a easy way but also made each section of the course interesting and enjoyable due to the awesome teaching method by 'Colt Steele'.",
        rating: 5,
        // author: ""
    },
    // review 1
    {
        body: "Great course while studying computer science students during summer vacation and I enjoyed each part of the course. Whoever is having passion for web development must pursue this course for having better knowledge about front and back end development.",
        rating: 5,
        // author: ""
    },
    // review 2
    {
        body: "It is an amazing course, earlier I didn't have the confidence to work on UI but after this course, I have the confidence that I can build and understand the code that is written by any JS developer.",
        rating: 5,
        // author: ""
    },
    // review 3
    {
        body: "Awesome course for beginners ,teaches you more than just Javascript,this course teaches you ,what you would do when you actually end up in a Javascript deeveloper job ,all the practical concpets which are used in the companies are taught ,like babel,webpack ,how to setup a localhost, MVC ,HTML DOM manipulation ,ES6 and many such practical real world concepts are covered rather than just the basic syntax of Javascript which you can study from W3schools also,So this is a must do course for a beginner who wants to be a Javascript developer.",
        rating: 4.5,
        // author: ""
    },
    // review 4
    {
        body: "This is the best course I’ve ever attended so far. Angela has taken so much effort to make this an exhaustive course covering all aspects of app development including minute details like Xcode shortcuts, best practices, useful websites etc… I really liked the way Angela talks with her soothing voice.",
        rating: 5,
        // author: ""
    },
    // review 5
    {
        body: "Oh my God, taking this course was pretty much like giving a glass of water to somebody living in hell, I mean with all these options you got, going to college, books and all that stuff there is no other person as good as a programming teacher as Angela, I've poured thousands of dollars on trying to learn all this stuff in college but it's been just a waste of money and time. 100% recommended, learning iOS development really changed my life in a big way tbh!",
        rating: 5,
        // author: ""
    },
    // review 6
    {
        body: "This is one of the most complex and useful Udemy course for Android development. Even if most of the projects are no more compatible with the actual Android Studio 4.x version, you can still follow the videos with some workaround. For anyone who wants to follow this great course I saved my projects source code fully compatible with Android Studio 4x at this link: https://github.com/mathexa/Complete-Android-N-Udemy-course-for-Android-Studio-4",
        rating: 5,
        // author: ""
    },
    // review 7
    {
        body: "It was an Amazing course. Just Loved It......??",
        rating: 4.5,
        // author: ""
    },
]
const fields = [
    {
        name: "web-development",
        courses: []
    },
    {
        name: "mobile-development",
        courses: []
    }
]
async function seedDB() {
    // clear all database collection documents
    await Course.remove({});
    await User.remove({});
    await Review.remove({});
    await Field.remove({});


    courses.forEach(async (course) => {
        await Course.create(course);
    })
    users.forEach(async (user) => {
        await User.create(user);
    })
    reviews.forEach(async (review) => {
        await Review.create(review);
    })
    fields.forEach(async (field) => {
        await Field.create(field);
    })
}
module.exports = seedDB;