var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('./server.js');

var User = require('./userModel');
var Event = require('./eventModel');
var userHandler = require('./userHandler');


/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////


describe ('', function() {

  beforeEach(function(done) {

    // Event.remove({'eventId': 'LOL_ITS_TEST'}).exec();
    User.create({'userId': 'Henry'}, function(err, user) {
      expect(user.userId).to.equal('Henry');

    }).then(function(){
      User.create({'userId': 'David',
       'zipCode':'12345',
       'interests': ['Movies','Sports']},
        function(err, user) {
        expect(user.userId).to.equal('David');
        done();
      });

    })

  });

  afterEach(function(done) {
    // Event.remove({'eventId': 'LOL_ITS_TEST'}).exec();
    User.remove({'userId': 'Henry'}).exec();
    User.remove({'userId': 'David'}).exec();
    done();

  });


  describe('Methods for User: ', function() {

    it('Successfully add users zipcode', function(done) {
      var req = {
        body: {
          userId: 'Henry',
          zipCode: '77025'
        }
      }
      userHandler.addZipCode(req)
      User.findOne({'userId': 'Henry'}, function(err, user) {
        expect(user.zipCode).to.equal('77025');
        done();
      });
    });

    it('Successfully add users interests', function(done) {
      var req = {
        body: {
          userId: 'Henry',
          interests: ['Classical', 'Music', 'Drinking']
        }
      }

      userHandler.addInterests(req)
      User.findOne({'userId': 'Henry'}, function(err, user) {
        expect(user.interests[0]).to.equal('Classical');
        expect(user.interests[1]).to.equal('Music');
        expect(user.interests[2]).to.equal('Drinking');
        done();
      });
    });

    it('Successfully get users zipCode', function(done) {
      var req = {
        body: {
          userId: 'David',
        }
      }, res = {
        json: function(result) {
          expect(result).to.equal('12345')
          done();
        }
      }

      userHandler.getUserZipcode(req, res)

    });
    it('Successfully get users interests', function(done) {
      var req = {
        body: {
          userId: 'David',
        }
      }, res = {
        json: function(result) {
          expect(result[0]).to.equal('Movies')
          expect(result[1]).to.equal('Sports')
          done();
        }
      }

      userHandler.getUserInterests(req, res)

    });

  });


});