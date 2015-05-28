'use strict';

var Model = require('../../../models');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

exports.login = function (req, res) {

  var name = req.body.name;
  var password = req.body.password;

  Model.User.find({
    where: {
      name: name
    }
  }).then(function (user) {
    if (user) {
      if (user.password == password) {
        var token = jwt.sign({ id: user.id }, config.secrets.session);
        res.status(201).json({token: token});
      } else {
        res.status(422).json({message: 'password error'});
      }
    } else {
      res.status(422).json({message: 'has no this user'});
    }
  });
};

exports.me = function (req, res) {
  var user = req.user;
  res.status(200).json(user);
};

exports.create = function (req, res) {
  var name = req.body.name;
  var password = req.body.password;
  Model.User.findOrCreate({
    where: {name: name},
    defaults: {
      role: 'user',
      password: password
    }
  }).spread(function(user, created) {
    if(created) {
      var token = jwt.sign({ id: user.id }, config.secrets.session);
      res.status(201).json({token: token});
    }else {
      res.status(422).json({message: 'name has been used'})
    }
  });
};