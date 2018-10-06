var mongoose = require('mongoose');

var fs = require('fs');
var path = require('path');
console.log('HEY, this is mongo')

mongoose.connect('mongodb://localhost/garage', { useMongoClient: true })
    ///.then(() => require('./db-init')(server))
    //.catch(err => console.error(err));

var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});