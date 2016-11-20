
/**
 * ArchiveSpace Data Controller
 */

const SOURCE = 'ArchivesSpace';
const SEARCH_BASE =
  'http://lbry-web-006.amnh.org:8089/repositories/3/search?page=1';
const PEOPLE_QUERYSTRING =
  'filter_term%5B%5D=%7B"primary_type"%3A"agent_person"%7D';

const addSource = results => results
  .map(r => Object.assign({}, r, {source: SOURCE}));

exports.people = query => (
  fetch(`${SEARCH_BASE}&q=${query}&${PEOPLE_QUERYSTRING}`)
    .then(res => res.json())
    .then(json => addSource(json.results))
);

exports.search = function (query) {
  // Query the API
  // var results = queryOmkea();
  var results = {
    source: 'aspace',
    name: 'The Name of an aspace Resource',
    description: 'Some aspace Data',
  };

  console.log('Test Data');

  return results;
};
