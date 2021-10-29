const router = require('express').Router();
const {  filterByQuery, findById, createNewAnimal, validateAnimal  } = require('../../lib/animals');
const {  animals  } = require('../../data/animals.json');

//route
//the function will take req.query as an arg and filter through animals accordingly
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//param routes must come after GET route
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    //set id 1 greater than the current highest id value
    req.body.id = animals.length.toString();
    //if any data in req.body is incorrect send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.')
    } else {
    //add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    //req.body, where incoming content will be
    res.json(animal);
    }    
});

module.exports = router;