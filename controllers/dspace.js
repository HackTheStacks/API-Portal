
/**
 * DSpace Data Controller
 */

exports.search = function (query) {
  //Query the API
  //var results = queryOmkea();
  var results = {
    source: 'dspace',
    name: 'The Name of an dspace Resource',
    description: 'Some dspace Data'
  }
  console.log('Test Data');

  return results;
}
