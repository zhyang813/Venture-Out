var mongoose = require('mongoose');
// will be used to store trending words
var keyWordSchema = new mongoose.Schema({
  word: String,
  count: Number
},
{
  timestamps: true
});

module.exports = mongoose.model('KeyWords', keyWordSchema);



