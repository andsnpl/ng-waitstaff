import angular from 'angular';
import 'angular-route';
import 'angular-local-storage';

angular.module('waitstaff', ['ngRoute', 'LocalStorageModule'])
  .config([
    '$routeProvider', 'localStorageServiceProvider',
    function ($routeProvider, localStorageServiceProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/index.view.html'
        })
        .when('/error', {
          templateUrl: 'templates/error.view.html'
        })
        .when('/new-meal', {
          templateUrl: 'templates/new-meal.view.html',
          controller: 'NewMealCtrl as ctrl'
        })
        .when('/my-earnings', {
          templateUrl: 'templates/my-earnings.view.html',
          controller: 'MyEarningsCtrl as ctrl'
        })
        .otherwise('/');

      localStorageServiceProvider.setPrefix('waitstaff');
    }
  ])
  .run([
    '$rootScope', '$location', 'localStorageService',
    function ($rootScope, $location, localStorageService) {
      $rootScope.$on('$routeChangeError', () => {
        $location.path('/error');
      });

      $rootScope.$on('$routeChangeSuccess', () => {
        localStorageService.set('lastVisited', $location.path());
      });

      $rootScope.$on('$routeUpdate', () => {
        localStorageService.set('lastVisited', $location.path());
      });

      let previousRoute = localStorageService.get('lastVisited');
      if (previousRoute) {
        $location.path(previousRoute);
      }
    }
  ]);
