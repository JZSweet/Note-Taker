// set npm
const fs = require("fs");
const path = require("path");
const express = require("express");
const uuid = require("uuid");
const db = fs.readFileSync("./db/db.json");
let writeNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

// set express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// api routes
app.get('/api/notes', (req, res) => {
    return res.json(writeNote)
});

// add note
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = `${Date.now()}`;
    writeNote.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(writeNote));
    return res.json(newNote);
});

// delete note
app.delete("/api/notes/:id", (req, res) => {
    let deleteNoteID = req.params.id;
    let noteIndex = writeNote.indexOf(deleteNoteID);
    writeNote.splice(noteIndex, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(writeNote));
    return res.send(writeNote)
});

// add server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));