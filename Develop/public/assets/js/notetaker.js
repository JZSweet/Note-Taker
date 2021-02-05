// set npm
const fs = require("fs");
const path = require("path");
const express = require("express");

// set express
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

// set html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/notes.html")));

// set api to fetch data
// add note
// delete note

// add server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));