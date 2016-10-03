var User = require('./userModel.js');
var mongoose = require('mongoose');

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
            console.log('User Successfully Created!', user)
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
  }

}