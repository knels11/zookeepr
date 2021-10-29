//dependencies 
const fs = require("fs");
const path = require("path");

//filter, find, create, validate animals functions
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
        console.log(personalityTraitsArray);
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

//accepts POST routes req.body value and array we want to add data to
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({  animals:  animalsArray  }, null, 2)
    );
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

module.exports = {
    filterByQuery,
    findById, 
    createNewAnimal,
    validateAnimal
};