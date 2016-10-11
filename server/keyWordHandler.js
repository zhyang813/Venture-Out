var keyWord = require('./keyWordModel.js');
var services = require('./services.js');
var async = require('async');


module.exports = {
  addKeyWordsToDB: function(req, res) {
    // req.body.titles
    services.titlesToKeyWords()
  },
  getKeyWordsFromDB: function(req, res) {
    // keyWord.find({

    // })
  }
}