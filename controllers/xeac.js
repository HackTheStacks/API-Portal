var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
var parser = require('xml2json');
var { Converter } = require('csvtojson');
var Promise = require('promise');
var moment = require('moment');
var _ = require('lodash');

const mapPeople = (people) => {
  return people.map(person => {
    person.id = person['exac_id'];
    delete person['exac_id'];
    return person;
  });
};

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

exports.getPeople = (query = {}) => {
  const converter = new Converter({});
  const promise = new Promise((fulfill, reject) => {
    converter.fromFile(path.join(__dirname, '../data/person.csv'), (err, result) => {
      if (err) reject(err);
      else fulfill(result);
    });
  });
  return promise
    .then(mapPeople);
};

exports.getPerson = (id) => {
  return fetch(`http://data.library.amnh.org:8082/exist/rest/db/xeac/records/${id}.xml`)
    .then(response => response.text())
    .then(xml => parser.toJson(xml))
    .then(json => JSON.parse(json))
    .then(mapPerson);
};
