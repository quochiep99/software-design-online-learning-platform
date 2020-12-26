const express = require("express");
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require('express-session');
const moment = require("moment");
const urlManipulator = require("./utils/url");
const flash = require('connect-flash');


// Requiring routes
const courseRoutes = require("./routes/courses");
const indexRoutes = require("./routes/index")

// Load environment variables from .env file into process.env
require('dotenv').config();

const app = express();

//PORT
const PORT = process.env.PORT || 3000;

// MONGODB URL
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/web-online-academy';
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url).
    then(() => {
        console.log("database connected !!!");
    }).
    catch((err) => {
        console.log(err);
    });

// Express Handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        getTimeAgo: (date) => {
            return moment(date).fromNow();
        },
        getLastUpdatedString: (date) => {
            const newDate = new Date(date);
            // return newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear();
            const [hour, minute, second] = newDate.toLocaleTimeString("en-US").split(/:| /);
            // return hour + "h : " + minute + "m : " + second + "s    " + newDate.toDateString();
            return newDate.toTimeString();
        },
        calculateDiscountPercentage: (discountPrice, originalPrice) => {
            return ((100 * (originalPrice - discountPrice)) / originalPrice).toFixed(0);
        },

        // function to convert i.e. 'web-development' into 'Web Development'
        getFieldName: (fieldName) => {
            return fieldName.replace("-", " ").replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        },
        generatePagination: (result, currentURL) => {
            var ret = "";
            var previous = `<li class="left-etc"><a>&laquo;</a></li>`
            if (result.hasPrevPage) {
                previous = `<li class="left-etc"><a href=${currentURL.replace(`page=${result.page}`, `page=${result.prevPage}`)}>&laquo;</a></li>`
            }
            ret += previous;
            for (var i = 1; i <= result.totalPages; i++) {
                var pageHref = ""
                if (!currentURL.includes("page")) {
                    // add query string
                    pageHref = urlManipulator.addParameterToURL(currentURL, "page", i);
                } else {
                    pageHref = urlManipulator.removeParameterFromURL(currentURL, "page");
                    pageHref = urlManipulator.addParameterToURL(pageHref, "page", i);
                }
                // make the current page active and remove its href to make it unclickable since we are on this page
                if (i === result.page) {
                    ret += `<li class="active"><a>${i}</a></li>`
                } else {
                    ret += `<li><a href=${pageHref}>${i}</a></li>`
                }
            }
            var next = `<li><a>&raquo;</a></li>`;
            if (result.hasNextPage) {
                next = `<li><a href=${currentURL.replace(`page=${result.page}`, `page=${result.nextPage}`)}>&raquo;</a></li>`;
            }
            ret += next;
            return ret;
        },
        generateBestSeller: (totalStudents, options) => {
            if (totalStudents >= 13) {
                return options.fn();
            }
        },
        generateNew: (updatedAt, options) => {
            const today = new Date();
            const date = new Date(updatedAt);
            const diffTime = Math.abs(today - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // if the last updated day is within last 3 days
            if (diffDays <= 3) {
                return options.fn();
            }
        }
    }
}));
app.set('view engine', '.hbs');



// Serve static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

//SESSION SETUP
app.use(session({
    secret: 'elearning-platform',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

// CONNECT-FLASH
app.use(flash());

// PASSPORT MIDDLEWARES
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(function (req, res, next) {
    if (req.user) {
        res.locals.currentUser = req.user;
    }
    res.locals.currentURL = req.url;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.passport_error = req.flash("error");
    res.locals.errors = req.flash("errors");
    next();
})

// ROUTES
app.use("/", indexRoutes);
app.use("/it/:field/courses", courseRoutes)

// Handle 404 - Keep this as a last route
app.use(function (req, res, next) {
    res.status(404);
    res.render("404");
});

app.listen(PORT, (req, res) => {
    console.log("Server is starting at port " + PORT);
})