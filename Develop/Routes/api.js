const express = require("express");
const router = express.Router();

const fs = require ("fs").promises;
const crypto = require ('crypto');

router.get("/api/notes", async(req, res) => {
    try {
        const file = await fs.readFile('./db/db.jsion', 'utf8'); 
        const parsedFile = JSON.parse (file);
        res.json(parsedFile);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "unable to read note"});
    }
})

