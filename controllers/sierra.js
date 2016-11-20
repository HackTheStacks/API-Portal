var fetch = require('node-fetch');
var elasticSearch = require('./elasticSearch.js');

/**
 * Sierra Data Controller
 */

const SOURCE = 'sierra';
const SEARCH_PATHS = [
  'sierra_bib',
];
const SIZE = 200;

const search = query => {
  const uris = elasticSearch.getSearchURIs(SEARCH_PATHS);
  return Promise.all(uris.map(uri => (
    fetch(uri, elasticSearch.getOptions(query, SIZE))
  )))
    .then(resList => Promise.all(resList.map(res => res.json())))
    .then(jsonList => elasticSearch.getResults(jsonList, SOURCE));
};

exports.search = search;
