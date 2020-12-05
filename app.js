const express = require("express");
const exphbs = require('express-handlebars');


//requiring routes
const courseRoutes = require("./routes/courses");
const indexRoutes = require("./routes/index")

const app = express();

// load environment variables from .env file into process.env
require('dotenv').config();
const PORT = process.env.PORT;

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