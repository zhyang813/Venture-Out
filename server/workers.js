var Event = require('./eventHandler.js');
var Request = require('superagent');


module.exports = {

  fetchTM: function () {
    var futureDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON().slice(0,10);
    var count  = 1;

    var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=EHAU7JI8sxVlrnoDKQD0Ylr01o9cdudk&size=200&countryCode=US&startDateTime='+futureDate+'T00:00:00Z';

    Request.get(url).then(function(response) {
      response.body._embedded.events.forEach(function(event) {
       // console.log('response event ',count, ' : ', event._embedded.venues[0].city);
       // console.log('response event ',count, ' : ', event._embedded.venues[0].state);
       // console.log('response event ',count, ' : ', event._embedded.venues[0].country);
       // console.log('response event ',count, ' : ', event._embedded.venues[0].address);
       // console.log('response event ',count, ' : ', event._embedded.venues[0].location);
       // console.log('response event ',count, ' : ', event._embedded.venues[0].markets);
       // console.log('response event ',count, ' : ', event._embedded.venues[0].dmas);
       // console.log('response event ',count, ' : ', event._embedded);
       // console.log('response event ',count, ' : ', event._embedded.attractions? event._embedded.attractions[0].images : 0);
       // console.log('response event ',count, ' : ', event._embedded.attractions? event._embedded.attractions[0].classifications: 0);
       // console.log('=====================================');

         Event.findEvent(event.id, function() {
          var newEvent  = {
            name: event.name,
            eventId: event.id,
            desc: event.description || "No Description Available",
            url: event.url,
            imageUrl: event.images[event.images.length-1].url,
            timeZone: event.dates.timezone,
            eventStartTime: event.dates.start.dateTime || null,
            //eventEndTime: event.dates.end.dateTime || null,
            genre: event.classifications? event.classifications[0].segment.name.toLowerCase(): null,
            // address: {
            //   street: event.venues.address.line1+event.venues.address.line2,
            //   city: event.venues.city.name,
            //   state: event.venues.state.stateCode,
            //   zip_code: event.venues.postalCode,
            //   country: event.venues.country.countryCode
            // },
            // location: {
            //   lon: event.venues.location.longitude,
            //   lat: event.venues.location.latitude
            // }
            price: event.priceRanges? event.priceRanges[0].min : null
            };
            console.log("new event ", count, newEvent);
            Event.addEvent(newEvent);
         });
         count++;
       })
    });
    //console.log('worker is working')
  }

}