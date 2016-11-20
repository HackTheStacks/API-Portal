var _ = require('lodash');

const BASE = 'http://10.20.40.218:9200';

const _getBody = (query, size) => {
  return JSON.stringify({
    query: {
      query_string: {
        query: query
      }
    }
  });
};

const getBody = (query, size) => {
  return _getBody(query.split(' ').join(' AND '), size);
};

const getOptions = (query, size) => ({
  method: 'POST',
  body: getBody(query, size),
});

const getSearchURIs = paths => paths.map(p => `${BASE}/${p}/_search`);

const getResults = (jsonList, source) => {
  const hitsList = jsonList.map(json => json.hits.hits);
  const mergedResults = [].concat.apply([], hitsList);
  const sortedResults = _.sortBy(mergedResults, '_score').reverse();
  return sortedResults.map(r => Object.assign({}, r, {source: source}));
};

exports.getBody = getBody;
exports.getOptions = getOptions;
exports.getSearchURIs = getSearchURIs;
exports.getResults = getResults;
