'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var Model = require('../../models');

exports.isAuthenticated = function (req, res, next) {

  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.secrets.session, function(err, decode) {
    if(err) {
      console.log(err);
      res.status(422).json({message: 'token error'})
    }else{
      var id = decode.id;
      Model.User.find({
        where: {
          id: id
        }
      }).then(function(user) {
        if(user){
          req.user = user;
          next();
        }else{
          res.status(422).json({message: ''})
        }
      });
    }
  });
};