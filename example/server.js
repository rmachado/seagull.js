'use strict';

var express = require('express'),
    hbs = require('hbs'),
    Seagull = require('../index');

hbs.handlebars = require('handlebars');

var app = express();

app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
app.set('views', '.');

Seagull.registerComponent('components/form-input');

app.get('/', function(req, res){
  res.render('application', {});
});

app.listen(3000);
console.log('Application listening on port 3000');
