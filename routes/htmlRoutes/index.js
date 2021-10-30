const path = require('path');
const router = require('express').Router();

//route to respond with an html pg to display in the browser
//route that serves the index.html page
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//this route takes us to /animals
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'))
});
//this route takes us to the endpoint /zookeepers to display HTML content
router.get('/zookeepers', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;