const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const crypto = require('crypto');

router.get("/notes", async (req, res) => {
    try {
        const file = await fs.readFile('./db/db.json', 'utf8');
        const parsedFile = JSON.parse(file);
        res.json(parsedFile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to read notes" });
    }
});

router.post("/notes", async (req, res) => {
    try {
        const { title, text } = req.body;

        if (!title || !text) {
            return res.status(400).json({ error: "Missing title or text" });
        }

        const newNote = {
            title,
            text,
            id: crypto.randomUUID()
        };

        const file = await fs.readFile('./db/db.json', 'utf-8');
        const db = JSON.parse(file);
        db.push(newNote);

        await fs.writeFile('./db/db.json', JSON.stringify(db));
        res.json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Note failed to save" });
    }
});

router.delete("./notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const file = await fs.readFile('./db/db.json', 'utf-8');
        let db = JSON.parse(file);

        const newDb = db.filter(note => note.id !== id);

        if (db.length === newDb.length) {
            return res.status(404).json({ error: "Note not found" });
        }

        await fs.writeFile('./db/db.json', JSON.stringify(newDb));
        res.json({ message: "Note was deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to delete note" });
    }
});

module.exports = router;