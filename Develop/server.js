const express = require ("express");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

const apiRouter = require('./Routes/api.js');
const htmlRouter = require('./Routes/html.js');

app.use('/api', apiRouter);
app.use ('/', htmlRouter);
