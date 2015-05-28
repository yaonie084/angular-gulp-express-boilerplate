/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var passport = require('passport');
var config = require('./environment');

var redis = require('redis');
var client = redis.createClient(); //CREATE REDIS CLIENT
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var flash    = require('connect-flash');

module.exports = function(app) {
  var env = app.get('env');
  console.log(env);

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session(
    {
      secret: 'yourothersecretcode',
      store: new redisStore({ host: 'localhost', port: 6379, client: client }),
      saveUninitialized: false, // don't create session until something stored,
      resave: false // don't save session if unmodified
    }
  ));
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash());

  if ('production' === env || 'staging' === env) {
    app.use(favicon(path.join(config.root, 'dist', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'dist')));
    app.set('appPath', config.root + '/dist');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    //app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, '.tmp/serve'));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};