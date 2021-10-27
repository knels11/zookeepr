const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
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
    //req.body, where incoming content will be
    console.log(req.body);
    res.json(req.body);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});