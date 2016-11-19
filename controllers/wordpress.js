
/**
 * Wordpress Data Controller
 */

exports.search = function (query) {
  //Query the API
  //var results = queryOmkea();
  var results = {
    source: 'wordpress',
    name: 'The Name of an wordpress Resource',
    description: 'Some wordpress Data'
  }
  console.log('Test Data');

  return results;
}
