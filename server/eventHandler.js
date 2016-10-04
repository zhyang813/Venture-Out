var Event = require('./eventModel.js');
var services = require('./services.js')


module.exports = {

  // Add new Event
  addEvent: function(event){

    Event.create(event, function(err, event){
      if (err) {
        console.log("New event created error", err);
      } else {
        console.log('Successful created an event!')
      }
    });
  },


  // Find a specific event using eventId
  findEventById: function(eventId, callback){
    // console.log('findEvent', eventId);

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
  getAllEvents: function(req, res){

    Event.find({}, function(err, events) {
      if (err) {
        console.log("New event created error", err);
        res.status(500).send({error: err});
      } else {
        res.json(events);
      }
    });
  },

  findEvents: function(req, res){
    var numberOfEvents = Number.parseInt.call(this, req.params.amount)
    var zipCode = req.params.zip;

    var getLocation = function(zipCode){
      return (
        services.geocoder.geocode(zipCode)
        .then(function(result){
            var country;
            var city = result[0].city.split(' ').join('_');
            if(result[0].country === 'United States'){
              country = 'America'
            }
           return `${country}/${city}`
        })
      )
    },
    getEvents = function(zip){
      return Event.where('genre')
      .eq(req.params.name)
      .where('timeZone')
      .eq(zip)
      .limit(numberOfEvents)
      .then(function(result){
        res.json(result)
      })
      .catch(function(err){
        res.send(err)
      })
    }

    getLocation(zipCode)
    .then(getEvents)


  }

  // frontPageRecommendation: function(req, res) {

  //   var currentDate = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
  //   var currentTime = currentDate + 'T00:00:00Z'

  //   console.log('server currentTime', currentTime);

  //   Event.find({eventStartTime: currentTime}, function(err, events) {
  //     if (err) {
  //       console.log("New event created error", err);
  //       res.status(500).send({error: err});
  //     } else {
  //       console.log('server', events)
  //       //res.json(events);
  //     }
  //   });

  // }

}