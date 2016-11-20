var fetch = require('node-fetch');
var _ = require('lodash');

/**
 * DSpace Data Controller
 */

const SOURCE = 'DSpace';
const SEARCH_BASE = 'http://10.20.40.218:9200';
const SEARCH_PATHS = [
  'dspace_item',
  'dspace_collection',
  'dspace_community',
];
const SIZE = 1000;

const getBody = query => ({query: {match: {'_all': query}}, size: SIZE});

const getResults = jsonList => {
  const hitsList = jsonList.map(json => json.hits.hits);
  const mergedResults = [].concat.apply(this, hitsList);
  const sortedResults = _.sortBy(mergedResults, '_score').reverse();
  return sortedResults.map(r => Object.assign({}, r, {source: SOURCE}));
};

const search = query => {
  return Promise.all(SEARCH_PATHS.map(path => (
    fetch(`${SEARCH_BASE}/${path}/_search`, {
      method: 'POST',
      body: JSON.stringify(getBody(query)),
    })
  )))
    .then(resList => Promise.all(resList.map(res => res.json())))
    .then(getResults);
};

exports.search = search;
