var Event = require('./eventModel.js');


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
  }

}