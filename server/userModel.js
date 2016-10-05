var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  userId: String,
  zipCode: String,
  interests: [String],
  favoritedEvents: [String]
},
{
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

