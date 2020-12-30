const express = require("express");
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require('express-session');
const helpers = require("./helpers/helpers");
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
    helpers: helpers
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
    if (!req.url.includes("/login") && !req.url.includes("/logout") && !req.url.includes("/register") && !req.url.includes("/favicon.ico") && !req.url.includes("img/logo@2x.png")) {
        req.session.returnTo = req.url;
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
    res.render("404");
});

app.listen(PORT, () => {
    console.log("Server is starting at port " + PORT);
})