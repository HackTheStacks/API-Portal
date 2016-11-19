var express = require('express');
var router = express.Router();

//Import the API controllers
var omeka = require('../controllers/omeka');


/* GET API V1 search results. */
router.get('/', function(req, res, next) {
  var results = aggregateData();
  res.send(results);
});


//Query all the APIs
function aggregateData() {
  var resultsArray = [];
  
  var omekaResults = omeka.search('Test query');
  resultsArray.push(omekaResults);

  return resultsArray;
}

module.exports = router;
