const express = require('./config/express');
const config = require('./config/config');
const app = express();

app.listen(config.port);

module.exports = app;
console.log('Running on port ', config.port);