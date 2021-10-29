const fs = require ('fs');
const path = require('path');
const express = require('express');
//require data
const {  animals  } = require('./data/animals.json');

const PORT = process.env.PORT || 3001;
const app = express();
//middleware
//middleware that instructs server to make certain files available
app.use(express.static('public'));
//parse incoming string or array data
app.use(express.urlencoded({  extended: true  }));
//parse incoming JSON data
app.use(express.json());


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});