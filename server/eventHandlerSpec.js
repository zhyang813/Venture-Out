var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('./server.js');

var Event = require('./eventModel');
var eventHandler = require('./eventHandler');


/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////


describe ('', function() {

  beforeEach(function(done) {
    event1 = {
      eventId: 'demoTest',
      eventZip: '90001',
      address: {city: 'Los Angeles' },
      genre: 'Music'
    }
    event2 = {
      eventId: 'demoTest2',
      eventZip: '90001',
      address: {city: 'Los Angeles' },
      genre: 'Sports'
    }
    // Event.remove({'eventId': 'LOL_ITS_TEST'}).exec();
    Event.create(event1)
    .then(function() {
      Event.create(event2)
      .then(function() {
        done();
      })
    })

  });

  afterEach(function(done) {

    Event.remove({'eventId': 'demoTest'}).exec();
    Event.remove({'eventId': 'demoTest2'}).exec();
    // User.remove({'userId': 'David'}).exec();
    done();

  });


  describe('Methods for Events: ', function() {


    it('Successfully get events by zip', function(done) {
      var req = {
        params: {
          zip: '90001',
        }
      }, res = {
        json: function(result) {
          // console.log(result)
          expect(result[0].address.city).to.equal('Los Angeles')
          expect(result[0].eventId).to.equal('demoTest')
          done();
        }
      }

      eventHandler.getEventsByZip(req, res)

    });
    it('Successfully get events by zip and categories', function(done) {
      var req = {
        params: {
          zip: '90001',
          name: JSON.stringify(['Music', 'Sports'])
        }
      }, res = {
        json: function(result) {
          // console.log(result,'this is multiple result')
          expect(result[0].genre).to.equal('Music')
          expect(result[1].genre).to.equal('Sports')
          done();
        }
      }

      eventHandler.getEventsByCategoriesAndZip(req, res)

    });

  });


});