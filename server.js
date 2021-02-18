// set npm
const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid");
const db = fs.readFileSync("./db/db.json");
// const notes = JSON.parse(db);
let writeNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// set express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// api routes
app.get('/api/notes', (req, res) => {
    return res.json(writeNote)
});

// add note
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id =`${Date.now()}`;
    
    writeNote.push(newNote);
    dbUpdate(writeNote, res);
    return console.log("New note: " + newNote);
});

// delete note
app.delete("/api/notes/:id", (req, res) => {
    let deleteSelection = req.params.id;
    let deleteIndex = writeNote.indexOf(deleteSelection);
    writeNote.splice(deleteIndex, 1);
    dbUpdate(deleteIndex, res);
});

// add server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));