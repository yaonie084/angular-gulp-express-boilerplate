/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  // app.use('/api/things', require('./api/thing'));

  app.use('/api/users',require('./api/users'));

  //app.get('/api/users/me', function(req, res) {
  //  res.status(200).json({name: 'ethan1', role: "admin", token: 'this-token-value'});
  //});

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  app.route('/hello')
  .get(function(req, res) {
    res.status(200).json({message: 'hello world!'});  
  });

  app.get('/*', function(req, res) {
      res.sendFile(app.get('appPath') + '/index.html');
  });

  //app.post('/auth/local', passport.authenticate('local-signup', {
  //  successRedirect : '/', // redirect to the secure profile section
  //  failureRedirect : '/login', // redirect back to the signup page if there is an error
  //  failureFlash : true // allow flash messages
  //}));

  app.post('/auth/local', function(req, res) {
    res.status(201).json({token: 'this-token-value', role: "user"});
  });


};
