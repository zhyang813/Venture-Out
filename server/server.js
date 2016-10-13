var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var worker = require('./workers');
var eventHandler = require('./eventHandler');
var userHandler = require('./userHandler');
var keyWordHandler = require('./keyWordHandler')
var cron = require('cron').CronJob;

// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

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


// ======== Event Routes ========

// get all events
app.get('/api/events', eventHandler.getAllEvents);

// get all events by zipcode
app.get('/api/events/zipcode/:zip', eventHandler.getEventsByZip);

// get events by zipcode and interests from events collection
app.get('/api/user/zipcode/:zip/interests/:name', eventHandler.getEventsByCategoriesAndZip);


// ======== Key Word Routes ========

// get all words from keyword collection
app.get('/api/keywords/', keyWordHandler.getKeyWordsFromDB);

// add words to keyword collection
app.post('/api/keywords/', keyWordHandler.addKeyWordsToDB);


// ======== User Routes =========

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

// add user to user collection
app.post('/api/users', userHandler.addUser);

// id === user_id from auth0
// find user from user collection
app.get('/api/user/:id', userHandler.findUser);

// req.body should look like { userId: *'user_id' from auth*, favoritedEvent: *string of favorited event info* }
app.put('/api/user', userHandler.addFavorite);

// get user favorites events from user collection
app.get('/api/user/favorites/:id', userHandler.getFavorites);

// add zip code to a user in user collection
app.post('/api/user/addZipCode', userHandler.addZipCode);

// add interests to a user in user collection
app.post('/api/user/addInterests', userHandler.addInterests);

// get users zipcode from user collection
app.get('/api/user/:id/zipcode', userHandler.getUserZipcode);

// get user interests from user collection
app.get('/api/user/:id/interests', userHandler.getUserInterests);

// add image url to user in user collection
app.post('/api/user/addImgUrl', userHandler.addImgUrl);

// get image url from user in user collection
app.get('/api/user/getImgUrl/:id', userHandler.getImgUrl);


// route all unspecified paths to home
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

// Ticket Master Data Fetcher
// to grab events once, uncomment and run this file
// worker.fetchTM();
new cron('0 0 0 * * *', function() {3
  console.log('TM cron job running');
  worker.fetchTM();
}, null, true, 'America/Los_Angeles');

// EventBrite Data Fetcher
// to grab events once, uncomment setTimeout and run this file
// setTimeout(worker.fetchEB, 30000);
new cron('0 0 2 * * *', function() {
  console.log('EB cron job running');
  worker.fetchEB();
}, null, true, 'America/Los_Angeles');

module.exports = app;

