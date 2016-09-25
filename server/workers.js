var Event = require('./eventHandler.js');
var Request = require('superagent');


module.exports = {

  fetchTM: function () {
    var currentDate = new Date().toJSON().slice(0,10);
    //var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=EHAU7JI8sxVlrnoDKQD0Ylr01o9cdudk&startDateTime=${currentDate}T00:00:00Z&size=50&countryCode=US`;
    var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=EHAU7JI8sxVlrnoDKQD0Ylr01o9cdudk&size=50&countryCode=US`;
    // Request.get(url).then(function(response) {
    //   response.body._embedded.events.forEach(function(event) {
    //     console.log('response',event.description);
    //     console.log('================')
    //   })
    // });
    console.log('worker is working')
  }

}