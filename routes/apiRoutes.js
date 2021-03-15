// LOAD DATA
const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');
let notes = require("../db/db.json");

// ROUTING

module.exports = (app) => {

    //Display data from db.json
    app.get('/api/notes', (req, res) => {
        res.json(notes)

    });

    //Add data to db.json
    app.post('/api/notes', (req, res) => {
        let newNote = {
            id: uniqid(),
            title: req.body.title,
            text: req.body.text
        }
        console.log(newNote);

        notes.push(newNote)
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err, data) => {

            if (err) throw err;
            return res.json(notes);
        })
    });

    //Delete data from db.json
    app.delete('/api/notes/:id', function (req, res) {
        let targetId = (req.params.id);

        fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (err) => {
            if (err) throw err;
        });

        console.log(`Deleting note with id ${targetId}`);
        notes = notes.filter(newNote => {
            return newNote.id !== targetId;

        })
        console.log(notes);

        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json({ ok: true })
        });
    })

};