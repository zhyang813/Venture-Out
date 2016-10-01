var User = require('./userModel.js');
var mongoose = require('mongoose');

var db = mongoose.connection;

module.exports = {

  addUser: function(req, res) {
    User.create(req.body, function(error, user){
      if(error){
        console.error(error);
      } else {
        console.log('User Successfully Created!', user)
        res.json(user);
      }
    })
  },

  findUser: function(req, res) {
    User.findOne({'userId': req.params.id}, function(error, user){
      if(error){
        console.error(error);
      } else {
        res.json(user);
      }
    })
  },

  addFavorite: function(req, res) {

    console.log('****', req.body);
    db.collections.users.update(
      { userId: req.body.userId },
      { $push: { favoritedEvents: req.body.favoritedEvent } }
    );
    res.status(200).send('Successfully updated user');
  }

  // findEvent: function(eventId, callback){
  //   console.log('findEvent', eventId);

  //   Event.findOne({'eventId': eventId}, function(err, event){
  //     //console.log('event found?', event);
  //     if (err) {
  //       console.log("mongo findOne event err: ", err);
  //     } else if (!event) {
  //         callback();
  //     }
  //   });
  // },

  // getAllEvents: function(req, res){
  //   //console.log('get all events');
  //   Event.find({}, function(err, events) {
  //     console.log('events', events);
  //     if (err) {
  //       console.log("New event created error", err);
  //       res.status(500).send({error: err});
  //     } else {
  //       res.json(events);
  //     }
  //   });
  // }


}