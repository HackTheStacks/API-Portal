var express = require('express');
var router = express.Router();

//Import the API controllers
var omeka = require('../controllers/omeka');
var aspace = require('../controllers/aspace');
var dspace = require('../controllers/dspace');
var sierra = require('../controllers/sierra');
var snac = require('../controllers/snac');
var wordpress = require('../controllers/wordpress');
var xeac = require('../controllers/xeac');


/* GET API V1 search results. */
router.get('/', function(req, res, next) {
  var results = aggregateData();
  res.send(results);
});

router.get('/test', function(req, res, next) {
  var results = aggregateData();
  res.send('test');
});

router.get('/people', function (req, res, next) {
  xeac
    .getPeople()
    .then(people => res.send(people));
});

router.get('/people/:id', function (req, res, next) {
  xeac
    .getPerson(req.params.id)
    .then(person => res.send(person));
});

//Query all the APIs
function aggregateData() {
  var resultsArray = [];

  var omekaResults = omeka.search('Test query');
  var aspaceResults = aspace.search('Test query');
  var dspaceResults = dspace.search('Test query');
  var sierraResults = sierra.search('Test query');
  var snacResults = snac.search('Test query');
  var wordpressResults = wordpress.search('Test query');
  var xeacResults = xeac.search('Test query');

  resultsArray.push(omekaResults);
  resultsArray.push(aspaceResults);
  resultsArray.push(dspaceResults);
  resultsArray.push(sierraResults);
  resultsArray.push(snacResults);
  resultsArray.push(wordpressResults);
  resultsArray.push(xeacResults);

  return resultsArray;
}

module.exports = router;
