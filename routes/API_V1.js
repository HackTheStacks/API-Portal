var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Import the API controllers
var omeka = require('../controllers/omeka');
var aspace = require('../controllers/aspace');
var dspace = require('../controllers/dspace');
var sierra = require('../controllers/sierra');
var snac = require('../controllers/snac');
var wordpress = require('../controllers/wordpress');
var xeac = require('../controllers/xeac');
var csv = require('../controllers/csv');

const search = query => {

};

router.get('/search', function (req, res, next) {
  if (!req.query.query) {
    return res.json([]);
  }
  const query = req.query.query;
  return Promise.all([
    aspace.search(query),
    dspace.search(query),
    omeka.search(query),
    sierra.search(query),
    xeac.search(query)
  ]).then(responses => {
    let allResps = [].concat.apply([], responses);
    res.json(allResps);
  });
});

const formatSearchResponse = (type, obj, results) => {
  const response = {};
  response[type] = obj;
  response.results = results;
  return response;
};

router.get('/people', (req, res, next) => {
  csv
    .getPeople()
    .then(people => people.filter(_.matches(req.query)))
    .then(people => res.send(people));
});

router.get('/people/:id', (req, res, next) => {
  let person = null;
  xeac
    .getPerson(req.params.id)
    .then(p => {
      person = p;
      let fullName = person.name.first + ' ' + person.name.last;
      return search(fullName);
    }).then(results => res.json(
      formatSearchResponse('person', person, results)
    ));
});

router.get('/expeditions', (req, res, next) => {
  csv
    .getExpeditions()
    .then(expeditions => expeditions.filter(_.matches(req.query)))
    .then(expeditions => res.send(expeditions));
});

router.get('/expeditions/:id', (req, res, next) => {
  let expedition = null;
  xeac
    .getExpedition(req.params.id)
    .then(e => {
      expedition = e;
      return search(expedition.name);
    }).then(results => res.json(
      formatSearchResponse('expedition', expedition, results)
    ));
});

router.get('/exhibitions', (req, res, next) => {
  csv
    .getExhibitions()
    .then(exhibitions => exhibitions.filter(_.matches(req.query)))
    .then(exhibitions => res.send(exhibitions));
});

router.get('/exhibitions/:id', (req, res, next) => {
  xeac
    .getExhibition(req.params.id)
    .then(exhibition => res.send(exhibition));
});

router.get('/departments', (req, res, next) => {
  csv
    .getDepartments()
    .then(departments => departments.filter(_.matches(req.query)))
    .then(departments => res.send(departments));
});

router.get('/departments/:id', (req, res, next) => {
  xeac
    .getDepartment(req.params.id)
    .then(department => res.send(department));
});

router.get('/resources/sierra', function (req, res, next) {
  sierra
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

router.get('/resources/omeka', function (req, res, next) {
  omeka
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

router.get('/resources/archives-space', function (req, res, next) {
  aspace
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

router.get('/resources/dspace', function (req, res, next) {
  dspace
    .search(req.query.q)
    .then(results => res.json({results: results}));
});

// Query all the APIs
function aggregateData () {
  var resultsArray = [];

  var omekaResults = omeka.search('Test query');
  var aspaceResults = aspace.search('Test query');
  var dspaceResults = dspace.search('Test query');
  var sierraResults = sierra.search('Test query');
  var snacResults = snac.search('Test query');
  var wordpressResults = wordpress.search('Test query');

  resultsArray.push(omekaResults);
  resultsArray.push(aspaceResults);
  resultsArray.push(dspaceResults);
  resultsArray.push(sierraResults);
  resultsArray.push(snacResults);
  resultsArray.push(wordpressResults);

  return resultsArray;
}

module.exports = router;
