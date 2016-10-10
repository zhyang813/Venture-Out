var User = require('./userModel.js');
var Events = require('./eventModel.js');
var mongoose = require('mongoose');
var services = require('./services.js');

var db = mongoose.connection;

module.exports = {

  addUser: function(req, res) {
    console.log('Add User Called');
    User.findOne({'userId': req.body.userId}, function(error, user){
      if(error){
        console.error(error);
      } else if(user === null){
        User.create(req.body, function(error, user){
          if(error){
            console.error(error);
          } else {
            // console.log('User Successfully Created!', user)
            res.json(user);
          }
        })
      } else {
        console.log('User Already Created');
        res.status(200).send('User already exists!');
      }
    })
  },

  findUser: function(req, res) {
    console.log('Find User Called');
    User.findOne({'userId': req.params.id}, function(error, user){
      if(error){
        console.error(error);
      } else {
        console.log(user);
        res.json(user);
      }
    })
  },

  addFavorite: function(req, res) {
    console.log('Add Favorite Called');
    console.log('****', req.body);
    db.collections.users.update(
      { userId: req.body.userId },
      { $push: { favoritedEvents: req.body.favoritedEvent } }
    );
    res.status(200).send('Successfully updated user');
  },

  getFavorites: function(req, res) {
    console.log('Get Favorites Called');
    User.findOne({'userId': req.params.id}, function(error, user){
      if(error){
        console.error(error);
      } else {
        Events.find({ eventId: { $in: user.favoritedEvents } }, function(error, events){
          if(error){
            console.error(error)
          } else {
            res.json(events);
          }
        })
      }
    })
  },
  addZipCode: function(req, res) {
    db.collections.users.findOneAndUpdate(
      {userId: req.body.userId},
      {
        $set: { zipCode:req.body.zipCode }
      }
    ).then(function(result) {
      res.json(result)
    }).catch(function(err) {
      res.json(err)
    })
  },
  addInterests: function(req, res) {
    console.log(req.body)
    db.collections.users.findOneAndUpdate(
      {userId: req.body.userId},
      {
        $addToSet: { interests: { $each: req.body.interests } }
      }
    ).then(function(result) {
      res.json(result)
    }).catch(function(err) {
      res.json(err)
    })
  },
  getUserZipcode: function(req, res) {
    console.log
    db.collections.users.findOne(
      {userId: req.params.id}
    ).then(function(result) {
      res.json(result.zipCode)
    }).catch(function(err) {
      res.json(err)
    })
  },
  getUserInterests: function(req, res) {
    db.collections.users.findOne(
      {userId: req.params.id}
    ).then(function(result) {
      res.json(result.interests)
    }).catch(function(err) {
      res.json(err)
    })
  }

}