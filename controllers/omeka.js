/**
 * Omeka Data Controller
 */

exports.search = function (query) {
  //Query the API
  //var results = queryOmkea();
  var results = {
    source: 'Omeka',
    name: 'The Name of an Omeka Resource',
    description: 'Some Omeka Data'
  }
  console.log('Test Data');

  return results;
}
