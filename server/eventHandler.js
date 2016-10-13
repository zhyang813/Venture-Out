var Event = require('./eventModel.js');
var services = require('./services.js');
var async = require('async');


module.exports = {

  // Add new Event
  addEvent: function(event) {
    Event.create(event, function(err, event) {
      if (err) {
        console.log("New event created error", err);
      } else {
        console.log('Successful created an event!')
      }
    });
  },

  // Find a specific event using eventId
  findEventById: function(eventId, callback) {

    Event.findOne({'eventId': eventId}, function(err, event){
      // console.log('event found?', event);
      if (err) {
        console.log("mongo findOne event err: ", err);
      } else if (!event) {
        callback();
      }
    });
  },

  // Get all the events
  getAllEvents: function(req, res) {
    Event.find({}, function(err, events) {
      if (err) {
        console.log("New event created error", err);
        res.status(500).send({error: err});
      } else {
        res.json(events);
      }
    });
  },

  // returns promise for chaining, does not take requests or send responses
  getLocationFromZipPromise: function(zipCode) {
    return (services.geocoder.geocode(zipCode)
      .then(function(result) {
        var country;
        var city = result[0].city.split(' ').join('_');
        if(result[0].country === 'United States') {
          country = 'America'
        }
        return {
          country: country,
          city: city
        }
      })
    )
  },

  // returns promise for chaining, does not take requests or send responses
  // locationData is the result from the geocoder api
  // if genre is included search by category, if not get all events by city
  getEventsPromise: function(locationData, genre, limit) {
    var city = locationData.city.split('_').join(' ');

    if(!genre) {

      return Event.where('address.city').eq(city).sort('createdAt').limit(20)

    } else {
      // using a regex to find categories in searches that have multiple words
      var regex = `\\bgenre\\b`.replace('genre', genre).split('"').join('');

      return Event.find({
        $and: [
          {'address.city': city},
          {'genre': { $regex: regex }}
        ]
      })
    }
  },

  // Use this method to get events by zip requires the zipcode in req params
  getEventsByZip: function(req, res) {
    // ignore for now may be used later
    // var numberOfEvents = Number.parseInt.call(this, req.params.amount)
    var zipCode = req.params.zip;

    // use promises in a chain
    module.exports.getLocationFromZipPromise(zipCode)
    .then(module.exports.getEventsPromise)
    .then(function(result) {
      res.json(result)
    })
    .catch(function(err) {
      res.json(err)
    })
  },

  // grab events by categories and zip
  getEventsByCategoriesAndZip: function(req, res) {
    var zipCode = req.params.zip;
    var that = this;

    // This function is called after getLocationFromZipPromise
    // and provides locationData as an argument
    getMultipleEvents = function(locationData) {

      var events = [];

      // JSON is stringified in the request. slice off start/end quotations
      var interests = req.params.name.slice(1, req.params.name.length - 1).split(',')

      // this runs async functions in order
      async.waterfall([
        // waterfall takes in an array of async operations and runs them in async order the second arguement is a function that runs when every async function is ran
        // outerCallback is for async.waterfall to know when a function has finished running
        function(outerCallback) {
        // async map will getEvents based on every interest in the interests array
          async.map(interests, function(interest, callback) {
            module.exports.getEventsPromise(locationData, interest, 4)
            .then(function(result) {
              callback(null, result)
            })
            .catch(function(err) {
              res.json(err)
            });
          }, function(err, result) {
            // signals the current async function is done running
            outerCallback(err, result)
          })
        }
      ],
        // run this function after all async functions have ran
        function(err, result) {
          console.log('prmoise chain successful')
        // flatten arrays into one array
        result = result.reduce(function(store, next) {
          next.forEach(function(element) {
            store.push(element)
          })
          return store }, [])

          res.json(result)
        }
      )
    }
    // use promises in a chain
    module.exports.getLocationFromZipPromise(zipCode)
    .then(getMultipleEvents)
  }

}
