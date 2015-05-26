'use strict';

var express = require('express');
var controller = require('./users_controller');
var auth = require('../../middleware/auth');

var router = express.Router();

router.post('/login', controller.login);
router.post('/', controller.create);
router.get('/me', auth.isAuthenticated, controller.me);

module.exports = router;