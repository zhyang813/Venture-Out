# Venture Out

## Team

  - __Product Owner__: Hoon Bae
  - __Scrum Master__: David Thai
  - __Development Team Members__: Caleb Aston, Henry Yang

## Description
VentureOut is an event app that recommends you relevant events based on your event keyword, availability, budget, location, and interests.

Mobile Version: https://github.com/hrr18-codebrewers/ventureout-mobile

## Development

### Installation

From within the root directory:

```sh
npm install
```

To run the code locally you need to run Mongod:

 ```sh
mongod
```

You will also need a localserver on port 1337. You can launch the local server with:

```sh
npm run serve
```

### Prerequisites
You will need API keys from [Eventbrite](http://developer.eventbrite.com/), [Ticketmaster](http://developer.ticketmaster.com/), and [Auth0](https://auth0.com/).

- Eventbrite API keys are stored in server/workers.js embedded into http request url
- Ticketmaster API keys are stored in server/workers.js embedded into http request url
- Auth0 API keys are stored in src/app/auth/auth.service.ts

Eventbrite and Ticketmaster are the event ticketing websites that will serve CRUD for events.
Auth0 is used for user authentication.
