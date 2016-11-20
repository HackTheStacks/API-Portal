var fetch = require('node-fetch');
var elasticSearch = require('./elasticSearch.js');

/**
 * omeka Data Controller
 */

const SOURCE = 'omeka';
const SEARCH_PATHS = [
  'item',
  'collection',
  'exhibit',
  'element',
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
