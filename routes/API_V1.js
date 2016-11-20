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
  return Promise.all([
    aspace.search(query),
    dspace.search(query),
    omeka.search(query),
  ])
    .then(responses => [].concat.apply([], responses));
};

const formatSearchResponse = (type, obj, results) => {
  const response = {};
  response[type] = obj;
  response.results = results;
  return response;
};

const filterQueryParams = (params) => (entity) => {
  return Object.keys(params).every((key) => {
    if (typeof params[key] !== 'string') return params[key] === entity[key];
    return entity[key].includes(params[key]);
  })
};

/* GET API V1 search results. */
router.get('/', function (req, res, next) {
  var results = aggregateData();
  res.send({results: results});
});

router.get('/people', (req, res, next) => {
  csv
    .getPeople()
    .then(people => people.filter(filterQueryParams(req.query)))
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
    .then(expeditions => expeditions.filter(filterQueryParams(req.query)))
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
    .then(exhibitions => exhibitions.filter(filterQueryParams(req.query)))
    .then(exhibitions => res.send(exhibitions));
});

router.get('/exhibitions/:id', (req, res, next) => {
  let exhibition = null;
  xeac
    .getExhibition(req.params.id)
    .then(e => {
      exhibition = e;
      return search(exhibition.name);
    }).then(results => res.json(
      formatSearchResponse('exhibition', exhibition, results)
    ));
});

router.get('/departments', (req, res, next) => {
  csv
    .getDepartments()
    .then(departments => departments.filter(filterQueryParams(req.query)))
    .then(departments => res.send(departments));
});

router.get('/departments/:id', (req, res, next) => {
  let department;
  xeac
    .getDepartment(req.params.id)
    .then(d => {
      department = d;
      return search(department.name);
    }).then(results => res.json(
      formatSearchResponse('department', department, results)
    ));
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
