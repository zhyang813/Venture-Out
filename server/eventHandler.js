var Event = require('./eventModel.js');
var services = require('./services.js')


module.exports = {

  // Add new Event
  addEvent: function(event){

    Event.create(event, function(err, event){
      if (err) {
        console.log("New event created error", err);
      } else {
        console.log('Successful created a event!')
      }
    });
  },


  // Find a specific event using eventId
  findEvent: function(eventId, callback){
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
    console.log(Number.parseInt.call(this, req.params.amount))
    var numberOfEvents = Number.parseInt.call(this, req.params.amount)
    var zipCode;
    services.geocoder.geocode('94604', function(err, res) {
      console.log(res);
    });
    Event.where('genre').eq(req.params.name).limit(numberOfEvents)
    .then(function(result){
      res.send(result)
    })
    .catch(function(err){
      res.send(err)
    })

  }

}