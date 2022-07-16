// dependencies 
const fs = require("fs");
const path = require('path');

module.exports = app => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var savedNotes = JSON.parse(data);

        app.get("api/notes", function(req, res) {
            res.json(savedNotes);
        });
        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            savedNotes.push(newNote);
            postNote();
            return console.log("Note added!");
        });
        app.get("/api/notes/:id", function (req, res) {
            res.json(savedNotes[req.params.id]);
        });

        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

function postNote() {
    fs.writeFile("db/db.json", JSON.stringify(savedNotes, '\t'), err => {
        if (err) throw err;
        return true;
    });
}
});
}
