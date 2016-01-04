import angular from 'angular';

angular.module('waitstaff').controller('NewMealCtrl', [
  '$scope', 'meal',
  function NewMealCtrl($scope, meal) {

    this.reset = function (form) {
      form.$setPristine();
      $scope.meal = meal.reset();
      $scope.bill = meal.bill();
    };

    this.submit = function (form) {
      if (form.$invalid) {
        this.errorMessage = 'Form must be filled out completely before saving.';
        return;
      }

      this.errorMessage = '';
      $scope.bill = meal.submit();
    };

    this.reset();
  }
]);
