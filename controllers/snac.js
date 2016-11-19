
/**
 * SNAC Data Controller
 */

exports.search = function (query) {
  //Query the API
  //var results = queryOmkea();
  var results = {
    source: 'snac',
    name: 'The Name of an snac Resource',
    description: 'Some snac Data'
  }
  console.log('Test Data');

  return results;
}
