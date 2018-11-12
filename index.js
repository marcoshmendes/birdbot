var express = require('./config/express');
var config = require('./config/config');
var app = express();

app.listen(config.port);

module.exports = app;
console.log('server running - Port ', config.port);