var mongoose = require('mongoose');

var KeyWordSchema = new mongoose.Schema({
  word: String,
  count: Number
},
{
  timestamps: true
});

module.exports = mongoose.model('KeyWords', KeyWordSchema);



