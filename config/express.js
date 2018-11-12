var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('../app/route')(app);
return app;
};