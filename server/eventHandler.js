var Event = require('./eventModel.js');
var services = require('./services.js');
var async = require('async');


module.exports = {

  // Add new Event
  addEvent: function(event){

    // Event.findOne({'eventId': event.eventId}, function(err, event){
    //   // console.log('event found?', event);
    //   if (err) {
    //     console.log("mongo findOne event err: ", err);
    //   } else if (!event) {
        Event.create(event, function(err, event) {
          if (err) {
            console.log("New event created error", err);
          } else {
            console.log('Successful created an event!')
          }
        });
      // }
    // });
  },


  // Find a specific event using eventId
  findEventById: function(eventId, callback) {
    console.log('findEvent', eventId);

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
    return (
      services.geocoder.geocode(zipCode)
      .then(function(result){
        var country;
        var city = result[0].city.split(' ').join('_');
        if(result[0].country === 'United States'){
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
  // if genre is included search but category, if not get all events by city
  getEventsPromise: function(locationData, genre, limit) {
    var city = locationData.city.split('_').join(' ');
    if(!genre){
      return Event.where('address.city').eq(city).sort('createdAt').limit(20)
    } else {
      // using a regex to find categories in searches that have multiple words
      var regex = `\\bgenre\\b`.replace('genre', genre).split('"').join('');
      console.log(regex, 'this is in get events')
      return Event.find({
        $and: [
          {'address.city': city},
          {'genre': { $regex: regex }}

        ]
      })
    }

  },
  getEventsByZip: function(req, res) {
    var numberOfEvents = Number.parseInt.call(this, req.params.amount)
    var zipCode = req.params.zip;

    this.getLocationFromZipPromise(zipCode)
    .then(this.getEventsPromise)
    .then(function(result){
      res.json(result)
    })
    .catch(function(err){
      res.json(err)
    })

  },
  getEventsByCategoriesAndZip: function(req, res) {
    var numberOfEvents = Number.parseInt.call(this, req.params.amount)
    var zipCode = req.params.zip;
    console.log(req.params)
    var that = this;

    getMultipleEvents = function(locationData) {
     var events = [];

      // JSON is stringified in the request. slice off start/end quotations
      var interests = req.params.name.slice(1, req.params.name.length - 1).split(',')
      var limit = Math.floor(13/interests.length);
      async.waterfall([
        function(Outercallback){
          async.map(interests, function(interest, callback) {
            console.log(interest, locationData, '!------')
            that.getEventsPromise(locationData, interest, 4)
            .then(function(result){
              console.log(result, 'grabbing each event')
              callback(null, result)
            })
            .catch(function(err){
              console.log(err)
              res.json(err)
            });
          }, function(err, result){
            // console.log('query Successful')
            Outercallback(err, result)
          })
      }
      ],
      function(err, result){
        console.log('prmoise chain successful')
        // flatten arrays
        result = result.reduce(function(store, next) {
          next.forEach(function(element) {
            store.push(element)
          })
          return store
        }, [])
        res.json(result)
      }
      )

   }

   this.getLocationFromZipPromise(zipCode)
   .then(getMultipleEvents)

 }

}