'use strict';

angular.module('angularFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/user/login.html',
        controller: 'UserLoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/user/signup.html',
        controller: 'UserSignupCtrl'
      });
  });