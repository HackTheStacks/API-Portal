var fetch = require('node-fetch');
var Promise = require('promise');

var base_url = 'http://10.20.40.218:9200/item/';

exports.search = function (query) {
  //Query the API
  //var results = queryOmkea();
  var results = {
    source: 'Omeka',
    name: 'The Name of an Omeka Resource',
    description: 'Some Omeka Data'
  }
}

exports.getImage = (query) => {
  return fetch('http://10.20.40.218:9200/item/', { 
    method: 'POST', body: {
			"query": {
    		"match": {
      		//"_all": `${query}`
      		"_all": "Desert"
    		}
  		}
    }
  }).then(res => {
      return res.json();
  });
}
