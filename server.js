var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var makeRequest = require('request');
//var velocityUiPack = require("velocity-ui-pack");
var key = require('./keys').key;

//Express-specific
var app = express();
var PORT = process.env.PORT || 3000;

//app data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/assets'))); //serve the static portions of the site (JS and CSS)

// // routers - passed the app object
// require('./assets/routes/apiRoutes.js');
 require('./assets/routes/htmlRoutes.js')(app);


app.get('/api/getproducts', (request, res) => {
  const query = request.query.query || 'ipod';
  let requestUrl;
  if(request.query.catId) {
    requestUrl = `http://api.walmartlabs.com/v1/search?query=${query}&categoryId=${request.query.catId}&format=json&apiKey=${key}`;
  } else {
    requestUrl = `http://api.walmartlabs.com/v1/search?query=${query}&format=json&apiKey=${key}`;
  }
  console.log(requestUrl);
  const options = {
    url: requestUrl
  }
  return makeRequest.get(options, (error, response, body) => {
    console.log(body)
    if(!error) {
      try{
          return res.status(200).json(JSON.parse(body));
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: 'Error getting product'
        });
      }

    } else {
      return res.status(500).json({
        success: false,
        message: 'Unable to get product :('
      });
    }
  });

});

app.get('/api/categories', function(req, res) {
  const requestUrl = 'http://api.walmartlabs.com/v1/taxonomy?apiKey=' + key;
  const options = {
    url: requestUrl
  };

  return makeRequest.get(options, function(error, response, body) {
    if(!error) {
      const responseBody = JSON.parse(body);
      const categories = responseBody.categories.map(function(category) {
        return {
          id: category.id,
          name: category.name
        };
      });

      return res.status(200).json(categories);

    }
  });
});



//listening notification
app.listen(PORT, function() {
    console.log('App listening on http://localhost:' + PORT);
});
