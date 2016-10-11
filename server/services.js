var NodeGeocoder = require('node-geocoder');

module.exports = {
  geocoder: (function(){
    var options = {
      provider: 'google',
    };
    return NodeGeocoder(options);
  })(),
  titlesToKeyWords: function(titles){
    //TODO: add a dictionary to filter for non unique words
    keyWords = {}
    titles.forEach(function(title) {
        title.split(' ').forEach(function(word) {

            word = word.replace(/[^A-Za-z0-9]/g, '');
            if(keyWords[word]){
                keyWords[word] += 1
            } else {
                keyWords[word] = 1
            }
        })
    })
    return keyWords
  }
}
