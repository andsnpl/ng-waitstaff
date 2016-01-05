import angular from 'angular';

angular.module('waitstaff').controller('NewMealCtrl', [
  '$scope', 'mealService',
  function NewMealCtrl($scope, mealService) {
    let ctrl = this;

    ctrl.reset = function () {
      $scope.meal = mealService.reset();
      $scope.bill = mealService.emptyBill();
    };

    ctrl.cancel = function (form) {
      form.$setPristine();
      this.reset();
    };

    ctrl.submit = function (form) {
      if (form.$invalid) {
        $scope.errorMessage
          = 'Form must be filled out completely before saving.';
        return;
      }

      $scope.errorMessage = '';
      $scope.bill = mealService.submit();
    };

    ctrl.reset();
  }
]);
