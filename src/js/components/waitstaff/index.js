import angular from 'angular';

angular.module('waitstaff').controller('main', [
  '$scope',
  function ($scope) {
    $scope.entryForm = {
      price: 9.99
    };

    $scope.bill = {
      subtotal: 0,
      tip: 0,
      total () {
        return this.subtotal + this.tip;
      }
    };

    $scope.totals = {
      tips: 0,
      meals: 0,
      avgTip () {
        return this.tips / this.meals || 0;
      }
    };

    const reset = function () {
      $scope.entryForm = {
        price: 9.99
      };
      $scope.errorMessage = '';
    };

    const getSubtotal = function () {
      const taxRate = ($scope.entryForm.tax || 0) / 100;
      return $scope.entryForm.price * (1 + taxRate);
    };

    const getTip = function (subtotal) {
      const tipRate = ($scope.entryForm.tip || 0) / 100;
      return subtotal * tipRate;
    };

    $scope.submit = function (form) {
      if (form.$invalid) {
        this.errorMessage = 'Form must be filled out completely before saving.';
        return;
      }

      const st = getSubtotal(), tip = getTip(st);
      this.bill.subtotal = st;
      this.bill.tip = tip;
      this.totals.tips += tip;
      this.totals.meals++;
      this.errorMessage = '';
    };

    $scope.cancel = function (form) {
      form.$setPristine();
      reset();
    };

    $scope.resetAll = function (form) {
      this.cancel(form);
      this.bill.subtotal = 0;
      this.bill.tip = 0;
      this.totals.tips = 0;
      this.totals.meals = 0;
    };
  }
]);
