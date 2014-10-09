
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var path = require("path");
var bodyParser = require('body-parser');
var multer  = require('multer');
var methodOverride = require('method-override');
var app = express();
// Configuration

  app.set('views',path.join(__dirname + '/views'));
  app.set('view engine', 'ejs');
  app.set("port",process.env.PORT || 3000);
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(app.router);
  app.use(express.static(path.join(__dirname + '/static')));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

routes(app);

app.listen(3000, function(){
  console.log("Express server listening on port in 3000");
});
