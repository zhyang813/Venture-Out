var Event = require('./eventHandler.js');
var Request = require('superagent');


module.exports = {

  fetchTM: function () {

    console.log('TM fetcher is running');

    for (var i = 7; i < 30; i++) {
      var futureDate = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
      var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=EHAU7JI8sxVlrnoDKQD0Ylr01o9cdudk&size=30&countryCode=US&startDateTime='+futureDate+'T00:00:00Z';

      Request.get(url).then(function(response) {
        response.body._embedded.events.forEach(function(event) {
          Event.findEvent(event.id, function() {
            var newEvent  = {
              name: event.name,
              eventId: event.id,
              desc: event.description || "No Description Available",
              url: event.url,
              imageUrl: event.images[event.images.length-1].url,
              timeZone: event.dates.timezone,
              eventStartTime: event.dates.start.dateTime || null,
              genre: event.classifications? event.classifications[0].segment.name.toLowerCase(): null,
              address: {
                street: event._embedded.venues[0].address.line2? event._embedded.venues[0].address.line1 + event._embedded.venues[0].address.line2 : event._embedded.venues[0].address.line1,
                city: event._embedded.venues[0].city.name,
                state: event._embedded.venues[0].state.stateCode,
                zip_code: event._embedded.venues[0].postalCode,
                country: event._embedded.venues[0].country.countryCode
              },
              price: event.priceRanges? event.priceRanges[0].min : null
            };

            Event.addEvent(newEvent);
          });
        })
      });
    }
    console.log('TM fetcher finished running');
  }



}