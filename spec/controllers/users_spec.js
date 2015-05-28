'use strict';
var should = require('should');

var request = require('supertest');
var models = require('../../models');
var app = require('../../server/app');

describe('User Resources', function() {
  beforeEach(function (done) {
    models.User.sync({force: true}) // drops table and re-creates it
      .then(function () {
        done(null);
      })
      .catch(function (error) {
        done(error);
      });
  });

  describe('.create', function() {

    it('create user success', function (done) {

      request(app).post('/api/users')
        .send({
          name: "ethan",
          password: "112233"
        })
        .end(function (err, res) {
          res.status.should.eql(201);
          res.body.should.property('token');
          return done();
        });
    });

    it('name has been used', function (done) {

      models.User.create({
        name: 'ethan',
        password: '123456'
      }).then(function () {
        request(app).post('/api/users')
          .send({
            name: "ethan",
            password: "112233"
          })
          .end(function (err, res) {
            res.status.should.eql(422);
            res.body.should.eql({message: 'name has been used'});
            return done();
          });
      });
    });
  });

  describe('.login', function() {

    it('has no user name', function (done) {

      request(app).post('/api/users/login')
        .send({
          name: "ethan",
          password: "112233"
        })
        .end(function (err, res) {
          res.status.should.eql(422);
          res.body.should.eql({message: 'has no this user'});
          return done();
        });
    });

    it('password error', function (done) {
      models.User.create({
        name: 'ethan',
        password: '1234'
      }).then(function () {
        request(app).post('/api/users/login')
          .send({
            name: "ethan",
            password: "112233"
          })
          .end(function (err, res) {
            res.status.should.eql(422);
            res.body.should.eql({message: 'password error'});
            return done();
          });
      });
    });

    it('login success', function (done) {
      models.User.create({
        name: 'ethan',
        password: '1234'
      }).then(function () {
        request(app).post('/api/users/login')
          .send({
            name: "ethan",
            password: "1234"
          })
          .end(function (err, res) {
            res.status.should.eql(201);
            res.body.should.property('token');
            return done();
          });
      });
    });
  });
});