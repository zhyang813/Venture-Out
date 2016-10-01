var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: String,
  eventId: String,
  desc: String,
  url: String,
  imageUrl: String,
  timeZone: String,
  eventStartTime: Date,
  genre: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip_code: Number,
    country: String
  },
  price: Number
},
{
  timestamps: true
});

module.exports = mongoose.model('Events', EventSchema);



