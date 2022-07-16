const express = require("express");
const { readFileSync } = require("fs");
const fs = require("fs");
const path = require("path");
// initialize express.js server
const app = express();
const util = require('util');

// assign to server port 3001
const PORT = process.env.PORT || 3001;
// logic to read file and use util promisfy package to  
// convert note response to promise object response
const rfPromisfy = util.promisify(fs.readFile);
const wfPromisfy = util.promisify(fs.writeFile);
// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + 'public'));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    rfPromisfy("./db/db.json", "utf8")
    .then((response, err) => {
        if(err) console.log(err);
        return res.json(JSON.parse(response));
    });
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT + "!");
});