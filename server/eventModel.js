var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: String,
  id: String,
  desc: String,
  url: String,
  timeZone: String,
  startDateTime: Date,
  endDateTime: Date,
  eventStartTime: Date,
  eventEndTime: Date,
  imageUrl: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip_code: Number,
    country: String
  },
  location: {
    lon: String,
    lat: String
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Events', EventSchema);



