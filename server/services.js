var NodeGeocoder = require('node-geocoder');

module.exports = {
  geocoder: (function(){
    var options = {
      provider: 'google',
    };
    return NodeGeocoder(options);
  })(),
  test: function(){

  }
}
