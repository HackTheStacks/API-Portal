var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
var parser = require('xml2json');
var { Converter } = require('csvtojson');
var Promise = require('promise');


exports.search = function (query) {
  //Query the API
  //var results = queryOmkea();
  var results = {
    source: 'xeac',
    name: 'The Name of an xeac Resource',
    description: 'Some xeac Data'
  }

  return results;
}

exports.getPeople = () => {
  const converter = new Converter({});
  return new Promise((fulfill, reject) => {
    converter.fromFile(path.join(__dirname, '../data/person.csv'), (err, result) => {
      if (err) reject(err);
      else fulfill(result);
    });
  });
};

exports.getPerson = (id) => {
  return fetch(`http://data.library.amnh.org:8082/exist/rest/db/xeac/records/${id}.xml`)
    .then(response => response.text())
    .then(xml => parser.toJson(xml))
};
