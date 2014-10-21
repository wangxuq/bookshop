var express = require('express');
var routes = require('./routes');
var path = require("path");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer  = require('multer');
var methodOverride = require('method-override');
var settings = require('./settings');
var MongoStore = require('connect-mongo')(express);
var session = require('express-session');
var flash = require('connect-flash');
var app = express();
// Configuration
app.set('views',path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set("port",process.env.PORT || 3000);

app.use(cookieParser());
app.use(bodyParser({'Content-Type': 'application/x-www-form-urlencoded'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname + '/static')));
app.use(session({
    secret : settings.cookieSecret,
    cookie : {maxAge : 3600},
    store : new MongoStore({
        db : settings.db
    }),
    resave : true,
    saveUninitialized : true
}));
app.use(flash());
app.use(app.router);
// Routes
routes(app);

app.listen(3000, function(){
  console.log("Express server listening on port in 3000");
});
