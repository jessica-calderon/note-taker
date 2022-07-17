// require express, fs and path
const express = require("express");
const fs = require("fs");
const path = require('path');
// generate unique ids with nanoid package
const nanoid = require('nanoid');
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
       // log post request
       console.log(`${req.method} note request received!`)
    // read db
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
        // set title and text as request body
        const { title, text } = req.body;
        if (title && text) {
            // set note as object
            const newNote = {
                title,
                text,
                id: nanoid()
            }
            fs.readFile('./db/db.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    // parse db
                    const noteParse = JSON.parse(data);
                    // send new note to db
                    noteParse.push(newNote)
                    // write file to db with 4 indents and send success log
                    fs.writeFile('./db/db.json', JSON.stringify(noteParse, null, 4), (err) => {
                        err ? console.log(err) : console.log('Note successfully added!')
                    });
                };
            });
            // response success
            const status = {
                status: 'Success',
                body: newNote
            }

            console.log(status);
            res.json(status);
            // response error
        } else {
            res.json('Error posting note')
        }
    })

});

// get notes db
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
        if (error) {
            return console.log(error)
        }
/*         console.log(data) */
        res.json(JSON.parse(data))
    })
});
// delete note from db
app.delete('/api/notes/:id', (req, res) => {
    // log delete request
    console.log(`${req.method} note request received!`)
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        // parse db
        const parsedNotes = JSON.parse(data);
        // filter out all notes that don't match selected note id 
        const updatedNotes = parsedNotes.filter((note) => note.id !== id);
        // write db with updated deleted note
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 4), (err) => {
            err ? console.log(err) : console.log('Note deleted!')
        })
        res.json(`Note with id ${id} deleted`);
    })
});
// send new data to db
app.put("/api/notes/:id", function (req, res) {
    const uuidNote = JSON.parse(req.params.id)
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