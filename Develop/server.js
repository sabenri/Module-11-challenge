const express = require ("express");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

const apiRouter = require('./Routes/api.js');
const htmlRouter = require('./Routes/html.js');

app.use(express.json());
app.use(express.urlencoded({extened: true}));
app.use(express.static('public'));

app.use('/api', apiRouter);
app.use ('/', htmlRouter);


app.use ((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('sorry,something went wrong');
});

app.use((req, res) =>{
    res.status(404).send('404: Page Not Found'); 
});

app.listen(PORT,() =>
    console.log('Listening at http://localhost:${PORT}')
)