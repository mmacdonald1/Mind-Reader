//Routing for API calls
var request = require('request');
var options = {
  url: 'http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=tkbba2th3uz8wjtsk6s99rmq'
};
request.get(options, function(error, response, body){
console.log(body);
});
