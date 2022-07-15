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

// starts server 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT + "!");
})
// get initial client side pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});