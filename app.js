const express = require("express");
const exphbs = require('express-handlebars');

const app = express();

app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.use(express.static("public"));


//load environment variables from .env file into process.env
require('dotenv').config();

const PORT = process.env.PORT;




app.get("/", (req, res) => {
    // res.send("ok")
    res.render("landing");
})




app.listen(PORT, (req, res) => {
    console.log("Server is starting at port " + PORT);
})