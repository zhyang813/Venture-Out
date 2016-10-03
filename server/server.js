var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var worker = require('./workers');
var eventHandler = require('./eventHandler');
var userHandler = require('./userHandler');
var cron = require('cron').CronJob;


// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
// q
mongoose.Promise = require('q').Promise;

// start express
var app = express();

// set mongoURI
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/ventureout';

// connect db
mongoose.connect(mongoURI);


// set middleware
// use morgan
app.use(morgan('dev'));

// use bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use cookieParser
app.use(cookieParser());

// use express.static to serve client folder
app.use(express.static(__dirname));

app.get('/api/events', eventHandler.getAllEvents);
//app.get('/api/searchevents', eventHandler.searchEvents);

/*
req.body template for POST
{
  "name": "Me",
  "email": "me@me.com",
  "userId": "me",
  "interests": ["art", "sports"],
  "favoritedEvents": ["event1","event2"]
}
*/
app.post('/api/users', function(req, res) {
  userHandler.addUser(req, res);
});

// id === user_id from auth0
app.get('/api/user/:id', function(req, res) {
  userHandler.findUser(req, res);
});

// req.body should look like { userId: *'user_id' from auth*, favoritedEvent: *string of favorited event info* }
app.put('/api/user', function(req, res) {
  userHandler.addFavorite(req, res);
})

//Routes
app.get('/api/events/category/:name/event/:amount', function(req, res) {
  // eventHandler.
  eventHandler.findEvents(req, res)
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// set port
var port = process.env.PORT || 1337;

// listen on port
app.listen(port);

console.log("Server is listening on port " + port);

// Ticket Master data fetcher
worker.fetchTM();
new cron('0 0 0 * * *', function() {
  console.log('TM cron job running');
  worker.fetchTM();
}, null, true, 'America/Los_Angeles');

// EventBrite data fetcher
worker.fetchEB();
new cron('0 0 2 * * *', function() {
  console.log('EB cron job running');
  worker.fetchEB();
}, null, true, 'America/Los_Angeles');

module.exports = app;





// downloaded example
// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var app = express();

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(__dirname));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,'index.html'));
// });
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// if (app.get('env') === 'development') {
//   app.listen(3000, function () {
//     console.log('Example app listening on port 3000!');
//   });
// } else{
//   app.listen(8080, function () {
//     console.log('Example app listening on port 8080!');
//   });
// }
// module.exports = app;