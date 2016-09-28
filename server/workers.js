var Event = require('./eventHandler.js');
var Request = require('superagent');


module.exports = {

  fetchTM: function () {
    var currentDate = new Date().toJSON().slice(0,10);
    var count  = 1;
    var eventStartTime;
    var price;
    //var url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=EHAU7JI8sxVlrnoDKQD0Ylr01o9cdudk&startDateTime=${currentDate}T00:00:00Z&size=50&countryCode=US`;
    var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=EHAU7JI8sxVlrnoDKQD0Ylr01o9cdudk&size=100&countryCode=US&startDateTime='+currentDate+'T00:00:00Z';
    Request.get(url).then(function(response) {
      response.body._embedded.events.forEach(function(event) {
       //console.log('response event ',count, ' : ', event.dates? event.dates: null);
         // console.log('=====================================');
         // eventStartTime = event.dates.start.dateTime || null;
         // price = event.priceRanges.min || null;

         // console.log('eventStartTime', eventStartTime);
         // console.log('price', price);

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
            genre: event.classifications? event.classifications[0].segment.name: null,
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