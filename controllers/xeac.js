var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
var parser = require('xml2json');
var { Converter } = require('csvtojson');
var Promise = require('promise');
var moment = require('moment');

const mapPeople = (people) => {
  return people.map(person => {
    person.id = person['exac_id'];
    delete person['exac_id'];
    return person;
  });
};

const mapPerson = (json) => {
  const { cpfDescription: { description, identity }, control } = json['eac-cpf'];
  return {
    id: control.recordId,
    description: description.biogHist,
    name: {
      first: identity.nameEntry.part[1].$t,
      last: identity.nameEntry.part[0].$t
    },
    'exist_dates': {
      start: moment(description.existDates.dateRange.fromDate.standardDate, 'YYYY-MM-DD').valueOf(),
      end: moment(description.existDates.dateRange.toDate.standardDate, 'YYYY-MM-DD').valueOf()
    }
  }
};

exports.getPeople = () => {
  const converter = new Converter({});
  return new Promise((fulfill, reject) => {
    converter.fromFile(path.join(__dirname, '../data/person.csv'), (err, result) => {
      if (err) reject(err);
      else fulfill(result);
    });
  }).then(mapPeople);
};

exports.getPerson = (id) => {
  return fetch(`http://data.library.amnh.org:8082/exist/rest/db/xeac/records/${id}.xml`)
    .then(response => response.text())
    .then(xml => parser.toJson(xml))
    .then(json => JSON.parse(json))
    .then(mapPerson);
};
