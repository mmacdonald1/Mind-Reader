var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var makeRequest = require('request');

//Express-specific
var app = express();
var PORT = process.env.PORT || 3000;

//app data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public')); //serve the static portions of the site (JS and CSS)

// // routers - passed the app object
// require('./assets/routes/apiRoutes.js');
// require('./assets/routes/htmlRoutes.js');
var request = require('request');
var options = {
  url: 'http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=tkbba2th3uz8wjtsk6s99rmq'
};
// request.get(options, function(error, response, body){
// console.log(body);
// });

app.get('/getproducts', (request, res) => {
  const query = request.query.query || 'ipod';
  const requestUrl = 'http://api.walmartlabs.com/v1/search?query=' + query + '&format=json&apiKey=tkbba2th3uz8wjtsk6s99rmq';
  const options = {
    url: requestUrl
  }
  return makeRequest.get(options, (error, response, body) => {
    if(!error) {
      return res.status(200).json(JSON.parse(body));
    } else {
      return res.status(500).json({
        success: false,
        message: 'Unable to get product :('
      })
    }
  });

  // return makeRequest.get('')
  // return response.json(req.body)
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/searchs', (req, res) => {
  res.sendFile(path.join(__dirname + '/search.html'))
});
//listening notification
app.listen(PORT, function() {
    console.log('App listening on http://localhost:' + PORT);
});
