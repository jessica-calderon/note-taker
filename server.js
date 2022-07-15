const express = require("express");
const fs = require("fs");
const path = require("path");
// initialize express.js server
const app = express();
// assign to server port 3001
const PORT = process.env.PORT || 3001;
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// use UUID library to generate a unique identifier 
const { v4: uuidv4 } = require('uuid');

// get initial client side pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// read db and show saved notes
app.get("/api/notes:note", function(req, res) {
    const selectNote = req.params.note;
    res.json(selectNote);
});
// post notes to db
app.post("/api/notes", (req, res) => {
    // save new note to body
    const userNote = req.body;
    // create a unique id with uuid library 
    userNote.id = uuidv4();
    // add note to db
    const newNote = fs.readFileSync('./db/db.json');
    // parse new note and push 
    const parsedNote = JSON.parse(newNote);
    parsedNote.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(parsedNote), (err, data) => {
        if (err) throw err;
        res.json(parsedNote);
    });
    // send response back to client (display new note)
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
// GET /notes.html
app.get("/notes", (req, res) => res.sendFile(__dirname + "/public/notes.html"));
// GET /index.html
app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
// starts server 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT + "!");
})