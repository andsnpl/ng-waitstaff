import angular from 'angular';
import 'angular-route';

angular.module('waitstaff', ['ngRoute'])
  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/index.html'
        })
        .when('/error', {
          templateUrl: 'templates/error.html'
        })
        .when('/new-meal', {
          templateUrl: 'templates/new-meal.html',
          controller: 'NewMealCtrl as this'
        })
        .when('/my-earnings', {
          templateUrl: 'templates/my-earnings.html',
          controller: 'MyEarningsCtrl as this'
        })
        .otherwise('/index');
    }
  ])
  .run([
    '$rootScope', '$location',
    function ($rootScope, $location) {
      $rootScope.$on('$routeChangeError', function () {
        $location.path('/error');
      });
    }
  ]);
