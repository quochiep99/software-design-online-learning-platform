const express = require("express");
const app = express();


//load environment variables from .env file into process.env
require('dotenv').config();

const PORT = process.env.PORT;





app.get("/", (req, res) => {
    res.send("ok");
})




app.listen(PORT, (req, res) => {
    console.log("Server is starting at port " + PORT);
})