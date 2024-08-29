const express = require ("express");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

const apiRouter = require('./Routes/api.js');
const htmlRouter = require('./Routes/html.js');

app.use('/api', apiRouter);
app.use ('/', htmlRouter);

app.use(express.json());
app.use(express.urlencoded({extened: true}));
app.use(express.static('public'));

app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('sorry,something went wrong');
});