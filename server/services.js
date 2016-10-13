var NodeGeocoder = require('node-geocoder');
var commonWords = require('./commonWordsJSON');

module.exports = {
  // sample useage geocoder.geocode(zipCode) returns an object with address
  // information goto https://github.com/nchaulet/node-geocoder for more use cases
  geocoder: (function(){
    var options = {
      provider: 'google',
    };
    return NodeGeocoder(options);
  })(),
  // breaks down an array of titles into words delimited by a space
  titlesToKeyWords: function(titles){
    keyWords = {}
    titles.forEach(function(title) {
      title.split(' ').forEach(function(word) {
          //replace any non alphanumberic characters with nothing
          word = word.replace(/[^A-Za-z0-9]/g, '');

          // do not add common words to trending words
          // common words are placed in commonWordsJSON.js
          if(word != '' && !commonWords[word]){
            if(keyWords[word]){
                keyWords[word] += 1
            } else {
                keyWords[word] = 1
            }
          }
      })
    })
    return keyWords
  }
}
