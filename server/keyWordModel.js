var mongoose = require('mongoose');

var keyWordSchema = new mongoose.Schema({
  word: String,
  count: Number
},
{
  timestamps: true
});

module.exports = mongoose.model('KeyWords', keyWordSchema);



