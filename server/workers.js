var Event = require('./eventHandler.js');
var Request = require('superagent');


module.exports = {


  // The worker for querying data from ticket master
  fetchTM: function () {

    console.log('TM fetcher is running');

    // To get the data between a week from now and in two weeks
    for (var i = 7; i < 15; i++) {

      var futureDate = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000).toJSON().slice(0,10);

      var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=o8BUqiVck0XjtbRwN6tUjVsSFSjB22Fo&size=30&countryCode=US&startDateTime='+futureDate+'T00:00:00Z';

      Request.get(url).then(function(response) {
        response.body._embedded.events.forEach(function(event) {

          // Check if the event is already in DB
           Event.findEventById(event.id, function() {

            // If it's new event, create event obj
            var newEvent  = {
              name: event.name,
              eventId: event.id,
              desc: event.description || "No Description Available",
              url: event.url,
              imageUrl: event.images[event.images.length-1].url,
              timeZone: event.dates.timezone,
              eventStartTime: event.dates.start.dateTime || null,
              genre: event.classifications? event.classifications[0].segment.name: null,
              address: {
                street: event._embedded.venues[0].address.line2? event._embedded.venues[0].address.line1 + event._embedded.venues[0].address.line2 : event._embedded.venues[0].address.line1,
                city: event._embedded.venues[0].city.name,
                state: event._embedded.venues[0].state.stateCode,
                zip_code: event._embedded.venues[0].postalCode,
                country: event._embedded.venues[0].country.countryCode
              },
              price: event.priceRanges? event.priceRanges[0].min : null
            };

            // Add new event
            Event.addEvent(newEvent);
          });
        })
      });
    }
  },


  fetchEB: function () {

    console.log('EB fetcher is running');

    // Map for category_id -> category name
    var categories = {
      '101': 'Business & Professional',
      '103': 'Music',
      '110': 'Food & Drink',
      '113': 'Community & Culture',
      '105': 'Performing & Visual Arts',
      '104': 'Film, Media & Entertainment',
      '108': 'Sports & Fitness',
      '107': 'Health & Wellness',
      '102': 'Science & Technology',
      '109': 'Travel & Outdoor',
      '111': 'Charity & Causes',
      '114': 'Religion & Spirituality',
      '115': 'Family & Education',
      '116': 'Seasonal & Holiday',
      '112': 'Government & Politics',
      '106': 'Fashion & Beauty',
      '117': 'Home & Lifestyle',
      '118': 'Auto, Boat & Air',
      '119': 'Hobbies & Special Interest',
      '199': 'other'
    };

    // To get the data between a week from now and in two weeks
    for (var i = 7; i < 15; i++) {

      var futureDate = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
      var startDate = futureDate + 'T00:00:00Z';

      var url = 'https://www.eventbriteapi.com/v3/events/search/?sort_by=best&location.address=us&start_date.range_start='+ startDate +'&expand=venue&token=YZO3HZ5MJZYKY6QU64H2';



      Request.get(url).then((response) => {

          //console.log('Event Brite Event : ', count, response.body.events[0]);

          response.body.events.forEach( function (event) {

            // console.log('Event Brite Event : ', count, event.venue? typeof event.venue.address.postal_code : null);
            // console.log("=============================")
            // count++;

            Event.findEventById(event.id, function() {

            // If it's a new event, create event obj
            var newEvent  = {
              name: event.name.text,
              eventId: event.id,
              desc: "No Description Available",
              url: event.url || null,
              imageUrl: event.logo? event.logo.url : null,
              timeZone: event.start.timezone || null,
              eventStartTime: event.start.utc || null,
              genre: categories[event.category_id] || null,
              address: {
                street: event.venue? (event.venue.address.line2? event.venue.address.line1 + event.venue.address.line2 : event.venue.address.line1) : null,
                city: event.venue? event.venue.address.city : null,
                state: event.venue? event.venue.address.region : null,
                zip_code: event.venue? (typeof event.venue.address.postal_code !== 'object'? +event.venue.address.postal_code: null) : null,
                country: event.venue? event.venue.address.country : null
              },
              price: null
            };

              // Add new event
              Event.addEvent(newEvent);
            });
          });
        });
    }
  }


}