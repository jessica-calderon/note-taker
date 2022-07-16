// require express, fs and path
const express = require("express");
const fs = require("fs");
const path = require('path');

// initialize express app 
const app = express();

// set server port 3001
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require('./routes/routes')(app);
// listen on port 3001
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT + "!");
}); 