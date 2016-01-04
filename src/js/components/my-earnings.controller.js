import angular from 'angular';

angular.module('waitstaff').controller('MyEarningsCtrl', [
  '$scope', 'totalEarnings',
  function MyEarningsCtrl($scope, totalEarnings) {
    $scope.totals = totalEarnings;
  }
]);
