require('dotenv').config()
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var makeRequest = require('request');
// var velocityUiPack = require("velocity-ui-pack");
var walmartKey = process.env.WALMART_KEY;
var awsId = process.env.AWS_ID;
var awsSecret = process.env.AWS_SECRET;
var assocId = process.env.ASSOC_ID;
var locale = 'US';

var { OperationHelper } = require('apac');

var opHelper = new OperationHelper({
    awsId,
    awsSecret,
    assocId,
    locale,
});
//Express-specific  adding text here for new push
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
    requestUrl = `https://api.walmartlabs.com/v1/search?query=${query}&categoryId=${request.query.catId}&format=json&apiKey=${walmartKey}`;
  } else {
    requestUrl = `https://api.walmartlabs.com/v1/search?query=${query}&format=json&apiKey=${walmartKey}`;
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
        message: 'Unable to get product  '
      });
    }
  });

});

app.get('/api/categories', function(req, res) {
  const requestUrl = 'https://api.walmartlabs.com/v1/taxonomy?apiKey=' + walmartKey;
  const options = {
    url: requestUrl
  };

  return makeRequest.get(options, function(error, response, body) {
    if(!error) {
      console.log('body ....', body)
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

app.get('/test', (rq, rs) => rs.send('Works'))

app.get('/api/products/amazon', function(req, res) {
  var query = req.query.query || 'ipad';
  var cat = req.query.cat;
  return opHelper.execute('ItemSearch', {
    'SearchIndex': 'All',
    'Keywords': query,
    'ResponseGroup': 'ItemAttributes, Offers, Images'
  }).then(function(response) {
    console.log('Getting Response');
    return res.status(200).json(response.result.ItemSearchResponse.Items.Item)
    // return res.status(200).json(response.result.ItemSearchResponse.items)
  }).catch(function(error) {
    return res.status(400).json({
      message: "Something bad happened"
    })
  })
});

//listening notification
app.listen(PORT, function() {
    console.log('App listening on http://localhost' + PORT);
});
