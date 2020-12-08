const express = require("express");
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require('express-session');
const User = require("./models/user");

const seedDB = require("./seedDB");

//seed database
// seedDB();

//requiring routes
const courseRoutes = require("./routes/courses");
const indexRoutes = require("./routes/index")

const app = express();

// load environment variables from .env file into process.env
require('dotenv').config();

//PORT
const PORT = process.env.PORT || 3000;

// mongodb url
const url = process.env.DATABASEURL || 'mongodb://localhost:27017/web-online-academy';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// express handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// serve static files
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

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {    
    if (req.user) {
        res.locals.currentUser = req.user.toJSON();
    }
    next();
})


// ROUTES
app.use("/", indexRoutes);
app.use("/courses", courseRoutes);


// Handle 404 - Keep this as a last route
app.use(function (req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});



app.listen(PORT, (req, res) => {
    console.log("Server is starting at port " + PORT);
})