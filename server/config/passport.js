var LocalStrategy = require('passport-local').Strategy;
var models = require('../../models');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    models.User.find({
      where: {
        id: id
      }
    }).then(function(user) {
      done(null, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

      process.nextTick(function() {
        models.User.findOne({
          where: {
            username: username
          }
        }).then(function(user) {
          if(user) {

            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          }else{
            models.User.create({
              username: username,
              password: password
            }).then(function(user) {

              return done(null, user);
            })
          }
        });
      });

    }));
};