var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Express-specific
var app = express();
var PORT = process.env.PORT || 8080;

//app data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public')); //serve the static portions of the site (JS and CSS)

// routers - passed the app object
require('./assets/routes/apiRoutes.js')(app);
require('./assets/routes/htmlRoutes.js')(app);


//listening notification
app.listen(PORT, function() {
    console.log('App listening on http://localhost:' + PORT);
});
