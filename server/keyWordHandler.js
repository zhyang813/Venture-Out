var keyWord = require('./keyWordModel.js');
var services = require('./services.js');
var async = require('async');
var mongoose = require('mongoose');
var db = mongoose.connection;

module.exports = {

  addKeyWordsToDB: function(req, res) {
    // req.body will hold an array of titles
    // will use a regex and split each title into words
    // a query will be made on each word and increment or add to the document
    var keyWords = services.titlesToKeyWords(req.body.titles)
    async.each(Object.keys(keyWords), function(keyword, callback) {
      keyWord.findOneAndUpdate(
        { word: keyword } ,
        { $inc: { count: keyWords[keyword] } },
        { upsert: true }
      )
      .then(function(result) {
        callback();
      })
    })
<<<<<<< 11d310775bacf68fcd05358d44eee89fcea8247f
    res.json('words added')
=======
>>>>>>> Polished code style
  },

  // query to get 20 words with the highest counts
  getKeyWordsFromDB: function(req, res) {
    keyWord.where().sort('-count').limit(20)
    .then(function(result) {
      res.json(result)
    })
  }

}