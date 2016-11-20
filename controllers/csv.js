var { Converter } = require('csvtojson');
var Promise = require('promise');
var fs = require('fs');
var path = require('path');

const mapPeople = (people) => {
  return people.map(person => {
    person.id = person['exac_id'];
    delete person['exac_id'];
    return person;
  });
};

const mapExpeditions = (expeditions) => {
  return expeditions.map(expedition => {
    expedition.id = expedition['exac_id'];
    delete expedition['exac_id'];
    return expedition;
  });
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

exports.getExpeditions = (query = {}) => {
  const converter = new Converter({});
  const promise = new Promise((fulfill, reject) => {
    converter.fromFile(path.join(__dirname, '../data/expedition.csv'), (err, result) => {
      if (err) reject(err);
      else fulfill(result);
    });
  });
  return promise
    .then(mapExpeditions);
};
