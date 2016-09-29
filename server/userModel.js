var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  user_id: String,
  interests: Array,
  favoritedEvents: Array
},
{
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

