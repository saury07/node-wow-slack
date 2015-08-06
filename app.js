var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./backend/routes/index');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('frontend'));

app.set('view engine', 'jade');

app.use('/', index);
app.use('/loots', require('./backend/routes/loots'));
app.use('/characters', require('./backend/routes/characters'));

module.exports = app;

app.listen('8085');
console.log('Magic happens on port 8085');
exports = module.exports = app;