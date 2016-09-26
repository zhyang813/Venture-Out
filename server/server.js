var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var worker = require('./workers');
var eventHandler = require('./eventHandler')

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


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'index.html'));
});

//Routes




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

//Ticket Master data fetcher
//setInterval(worker.fetchTM, 10000);
worker.fetchTM();

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