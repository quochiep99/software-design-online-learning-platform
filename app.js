const express = require("express");
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');


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


app.use("/", indexRoutes);
app.use("/courses", courseRoutes);






app.listen(PORT, (req, res) => {
    console.log("Server is starting at port " + PORT);
})