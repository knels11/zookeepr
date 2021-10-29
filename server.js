const fs = require ('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
//middleware
//parse incoming string or array data
app.use(express.urlencoded({  extended: true  }));
//parse incoming JSON data
app.use(express.json());
//middleware that instructs server to make certain files available
app.use(express.static('zookeepr-public'));

//require data
const { animals } = require('./data/animals.json');
//handles diff queries by extracting data
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //save animalsArray as filteredResults
    let filteredResults = animalsArray;
    //save personalityTraits as an array
    if (query.personalityTraits) {
        //if personality traits is a string place into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait per animal in filteredResults array
        personalityTraitsArray.forEach(trait => {
            //for each trait being targeted by the filter the filteredResults
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

//takes in the id and array of animals & returns a single animal object
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

//route
//the function will take req.query as an arg and filter through animals accordingly
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
//accepts POST routes req.body value and array we want to add data to
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({  animals:  animalsArray  }, null, 2)
    );
    console.log(body);
    //return finished code to post route for response
    return animal;
}
//validation func. takes new animal data from req.body and checks if each key exists and has right data
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string'){
        return false;
    }
    if (!animal.species || typeof animal.diet !== 'string'){
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){
        return false;
    }
    return true;
}
//if no record of the animal being searched exists, client receives 404 error
//param routes must come after GET route
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/animals', (req, res) => {
    //set id 1 greater than the current highest id value
    req.body.id = animals.length.toString();
    //if any data in req.body is incorrect send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.')
    } else {
    //add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);

    //req.body, where incoming content will be
    console.log(req.body);
    res.json(animal);
    }    
});
//route to respond with an html pg to display in the browser
//route that serves the index.html page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//this route takes us to /animals
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'))
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});