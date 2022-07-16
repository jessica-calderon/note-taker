// dependencies 
const fs = require("fs");
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var savedNotes = JSON.parse(data);
    })
}