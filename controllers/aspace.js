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

const getResults = json => json.results.map(r => {
  const newResult = Object.assign({}, r, {source: SOURCE});
  if (newResult.hasOwnProperty('json')) {
    newResult.json = JSON.parse(newResult.json);
  }
  return newResult;
});

const getSearchOptions = session => {
  const options = {};
  options.headers = {};
  options.headers[SESSION_HEADER] = session;
  return options;
};

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
  const options = getSearchOptions(session);
  return fetch(`${SEARCH_BASE}&q=${query}&${PEOPLE_QUERYSTRING}`, options)
    .then(res => res.json())
    .then(getResults);
};

const search = (query, session) => {
  const options = getSearchOptions(session);
  return fetch(`${SEARCH_BASE}&q=${query}`, options)
    .then(res => res.json())
    .then(getResults);
};

exports.people = query => (
  login().then(session => people(query, session))
);

exports.search = query => (
  login().then(session => search(query, session))
);
