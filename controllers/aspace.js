var fetch = require('node-fetch');

/**
 * ArchiveSpace Data Controller
 */

const SOURCE = 'ArchivesSpace';
const SEARCH_BASE =
  'http://lbry-web-006.amnh.org:8089/repositories/3/search?page=1';
const SESSION_HEADER = 'X-ArchivesSpace-Session';
const PEOPLE_QUERYSTRING =
  'filter_term%5B%5D=%7B"primary_type"%3A"agent_person"%7D';
const LOGIN_BASE = 'http://lbry-web-006.amnh.org:8089/users/ehammer/login';
const LOGIN_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'};

const addSource = results => results
  .map(r => Object.assign({}, r, {source: SOURCE}));

const login = () => (
  fetch(`${LOGIN_BASE}`, {
    method: 'POST',
    body: 'password=hackathon',
    headers: LOGIN_HEADERS,
  })
    .then(res => res.json())
    .then(json => json.session)
);

const people = (query, session) => {
  const options = {};
  options.headers = {};
  options.headers[SESSION_HEADER] = session;
  return fetch(`${SEARCH_BASE}&q=${query}&${PEOPLE_QUERYSTRING}`, options)
    .then(res => {
        /* if (res.status === 403) {
        return login
          .then(() => people(query));
      } */
      return res.json();
    })
    .then(json => addSource(json.results));
};

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

exports.people = query => (
  login().then((session) => people(query, session))
);
