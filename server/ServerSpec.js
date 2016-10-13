var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('./server.js');

var User = require('./userModel');
var Event = require('./eventModel');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////


describe ('', function() {

  beforeEach(function(done) {
    Event.remove({'eventId': 'LOL_ITS_TEST'}).exec();
    User.remove({'name': 'Henry'}).exec();
    done();

  });

  describe('Event creation: ', function() {
    it('Successful add an event', function(done) {
      Event.create({'eventId': 'LOL_ITS_TEST'}, function(err, event) {
        expect(event.eventId).to.equal('LOL_ITS_TEST');
        done();
      });
    });

    it('Successful find an event', function(done) {
      Event.create({'eventId': 'LOL_ITS_TEST'}, function(err, event) {
        Event.findOne({'eventId': 'LOL_ITS_TEST'}, function(err, event) {
          expect(event.eventId).to.equal('LOL_ITS_TEST');
          done();
        });
      });
    });

  });

  describe('Event searching: ', function() {
    it('Successful get all events using model method', function(done) {
      Event.create({'eventId': 'LOL_ITS_TEST'}, function(err, event) {
        Event.find({}, function(err, events) {
          expect(events.length).to.not.equal(0);
          done();
        });
      });
    });

    it('Successful get all events using server api', function(done) {
      request(app)
          .get('/api/events')
          .send({})
          .expect(200)
          .expect(function(res) {
            expect(res.body.length).to.not.equal(0);
          })
          .end(done);
    });

  });

  describe('User creation: ', function() {
    it('Successful add an user using model method', function(done) {
      User.create({'name': 'Henry'}, function(err, user) {
        expect(user.name).to.equal('Henry');
        done();
      });
    });

    it('Successful add an user using server api', function(done) {
      request(app)
          .post('/api/users')
          .send({'name': 'Henry'})
          .expect(200)
          .end(done);
    });

    it('Successful find an user using model method', function(done) {
      User.create({'name': 'Henry'}, function(err, event) {
        User.findOne({'name': 'Henry'}, function(err, event) {
          expect(event.name).to.equal('Henry');
          done();
        });
      });
    });

  });
});
