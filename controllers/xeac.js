
/**
 * xEAC Data Controller
 */

exports.search = function (query) {
  //Query the API
  //var results = queryOmkea();
  var results = {
    source: 'xeac',
    name: 'The Name of an xeac Resource',
    description: 'Some xeac Data'
  }
  console.log('Test Data');

  return results;
}
