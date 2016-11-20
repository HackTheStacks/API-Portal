var fetch = require('node-fetch');
var parser = require('xml2json');
var moment = require('moment');
var _ = require('lodash');

const mapPerson = (json) => {
  const person = { id: _.at(json, 'eac-cpf.control.recordId')[0] };
  const biogHist = _.at(json, 'eac-cpf.cpfDescription.description.biogHist')[0];
  const fromDate = _.at(json, 'eac-cpf.cpfDescription.description.existDates.dateRange.fromDate.standardDate')[0];
  const toDate = _.at(json, 'eac-cpf.cpfDescription.description.existDates.dateRange.toDate.standardDate')[0];
  const name = _.at(json, 'eac-cpf.cpfDescription.identity.nameEntry.part')[0];

  if (typeof biogHist !== 'undefined') {
    person.description = biogHist.p ? biogHist.p : biogHist;
  }
  if (typeof fromDate !== 'undefined' && typeof toDate !== 'undefined') {
    person['existDates'] = {
      start: moment(fromDate, 'YYYY-MM-DD').valueOf(),
      end: moment(toDate, 'YYYY-MM-DD').valueOf()
    };
  }
  if (typeof name !== 'undefined' && name[0] !== 'undefined' && typeof name[1] !== 'undefined') {
    person.name = {
      first: _.trim(name[1].$t, ','),
      last: _.trim(name[0].$t, ',')
    };
  }
  return person;
};

const mapExpedition = (json) => {
  const expedition = { id: _.at(json, 'eac-cpf.control.recordId')[0] };
  const biogHist = _.at(json, 'eac-cpf.cpfDescription.description.biogHist')[0];
  const date = _.at(json, 'eac-cpf.cpfDescription.description.existDates.date.standardDate')[0];
  const place = _.at(json, 'eac-cpf.cpfDescription.description.place.placeEntry')[0];
  const name = _.at(json, 'eac-cpf.cpfDescription.identity.nameEntry.part.$t')[0];

  if (typeof biogHist !== 'undefined') {
    expedition.description = biogHist.p ? biogHist.p : biogHist;
  }
  if (typeof date !== 'undefined') {
    expedition.date = date;
  }
  if (typeof place !== 'undefined') {
    expedition.place = place;
  }
  if (typeof name !== 'undefined') {
    expedition.name = name;
  }
  return expedition;
};

const fetchXEAC = (id) => {
  return fetch(`http://data.library.amnh.org:8082/exist/rest/db/xeac/records/${id}.xml`)
    .then(response => response.text())
    .then(xml => parser.toJson(xml))
    .then(json => JSON.parse(json));
};

exports.getPerson = (id) => fetchXEAC(id).then(mapPerson);
exports.getExpedition = (id) => fetchXEAC(id).then(mapExpedition);
