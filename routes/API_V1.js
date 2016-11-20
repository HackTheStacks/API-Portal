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
  });
};

const search = (query) => {
  return Promise.all([
    aspace.search(query),
    dspace.search(query),
    omeka.search(query),
    sierra.search(query),
    xeac.search(query)
  ]).then(responses => [].concat.apply([], responses));
};

router.get('/search', function (req, res, next) {
  if (!req.query.q) {
    return res.json([]);
  }
  const query = req.query.q;
  search(query).then(results => res.json(results));
});

router.get('/people', (req, res, next) => {
  csv
    .getPeople()
    .then(people => people.filter(filterQueryParams(req.query)))
    .then(people => res.json(people));
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
    .then(expeditions => res.json(expeditions));
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
    .then(exhibitions => res.json(exhibitions));
});

router.get('/exhibitions/:id', (req, res, next) => {
  let finalExhibition = null;
  console.log('exhibitions');
  csv
    .getExhibitions()
    .then(exhibitions => exhibitions.filter(filterQueryParams({ id: req.params.id })))
    .then(results => {
      console.log(results);
      return results;
    })
    .then(exhibitions => exhibitions[0])
    .then(exhibition => {
      if (!exhibition.permanent) return exhibition;
      return xeac.getExhibition(exhibition.id);
    })
    .then(exhibition => {
      finalExhibition = exhibition;
      return exhibition;
    })
    .then(exhibition => search(exhibition.name))
    .then(results => res.json(
      formatSearchResponse('exhibition', finalExhibition, results)
    ))
    .catch(error => console.log(error));
});

router.get('/departments', (req, res, next) => {
  csv
    .getDepartments()
    .then(departments => departments.filter(filterQueryParams(req.query)))
    .then(departments => res.json(departments));
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

module.exports = router;
