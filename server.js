const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
//require data
const {  animals  } = require('./data/animals.json');
//handles diff queries by extracting data
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //save animalsArray as filteredResults
    let filteredResults = animalsArray;
    //save personalityTraits as an array
    if (query.personalityTraits){
        //if personality traits is a string place into a new array and save
        if (typeof query.personalityTraits === 'string'){
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


//route
//the function will take req.query as an arg and filter through animals accordingly
app.get('/api/animals', (req,res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});