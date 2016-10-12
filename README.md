# Project Name

> VentureOut

## Team

  - __Product Owner__: Hoon Bae
  - __Scrum Master__: David Thai
  - __Development Team Members__: Caleb Aston, Henry Yang

## Description
VentureOut is an event app that recommends you relevant events based on your event keyword, availability, budget, location, and interests.

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

- Eventbrite API keys are stored in ??
- Ticketmaster API keys are stored in ??
- Auth0 API keys are stored in ??

Eventbrite and Ticketmaster are the event ticket websites that will serve CRUD for events.
Auth0 is used for user authentication.


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
