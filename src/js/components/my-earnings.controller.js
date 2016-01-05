import angular from 'angular';

angular.module('waitstaff').controller('MyEarningsCtrl', [
  '$scope', 'totalEarningsService', 'localStorageService',
  function MyEarningsCtrl($scope, totalEarningsService) {
    $scope.totals = totalEarningsService;
  }
]);
