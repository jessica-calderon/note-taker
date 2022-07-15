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