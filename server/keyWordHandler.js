var keyWord = require('./keyWordModel.js');
var services = require('./services.js');
var async = require('async');
var mongoose = require('mongoose');
var db = mongoose.connection;

module.exports = {
  addKeyWordsToDB: function(req, res) {
    // req.body.titles
    // req will hold an array of titles, title to keywords
    // will use a regex and split each title into words
    // a query will be made on each word and increment or add to the document
    var keyWords = services.titlesToKeyWords(req.body.titles)
    async.each(Object.keys(keyWords), function(keyword, callback) {
      console.log(keyword, keyWords[keyword])
      keyWord.findOneAndUpdate(
        { word: keyword } ,
        { $inc: { count: keyWords[keyword] } },
        { upsert: true }
      )
      .then(function(result) {
        console.log(result);
        callback();
      })
    })

  },
  getKeyWordsFromDB: function(req, res) {
    console.log('get keywords handler')
    keyWord.where().sort('-count').limit(20)
    .then(function(result) {
      res.json(result)
    })
  }
}