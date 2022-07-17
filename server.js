// require express, fs and path
const express = require("express");
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// initialize express app 
const app = express();

// set server port 3001
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// route to display client side index
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// route to display client side notes page 
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));

});
// post user notes to db
app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        if (error) {
            return console.log(error)
        }
        notes = JSON.parse(notes)

        const id = notes.length.toString();
        const newNote = { title: req.body.title, text: req.body.text, id: id }
        const thisNote = notes.concat(newNote)

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(thisNote), function (error, data) {
            if (error) {
                return error
            }
            console.log(thisNote)
            res.json(thisNote);
        });
    });
});
// get notes from database
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
        if (error) {
            return console.log(error)
        }
        console.log(data)
        res.json(JSON.parse(data))
    })
});
// delete note from db
app.delete('/api/notes/:id', (req, res) => {
    console.log(`${req.method} request received to delete a note`)
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        const parsedNotes = JSON.parse(data);
        const updatedNotes = parsedNotes.filter((note) => note.id !== id);

        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 4), (err) => {
            err ? console.log(err) : console.log('Note deleted!')
        })
        res.json(`Note with id ${id} deleted`);
    })
});
// send new data to db
app.put("/api/notes/:id", function (req, res) {
    const uuidNote = JSON.parse(req.params.id)
    console.log(uuidNote)
    fs.readFile(__dirname + "db/db.json", "utf8", function (error, notes) {
        if (error) {
            return console.log(error)
        }
        notes.JSONparse(notes)

        notes = notes.filter(val => val.id !== uuidNote)

        fs.writeFile(__dirname + "db/db.json", JSON.stringify(notes, null, 4), function (error, data) {
            if (error) {
                return error
            }
            res.json(notes)
        })
    })
})
// listen on port 3001
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT + "!");
}); 