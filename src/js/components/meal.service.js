import angular from 'angular';

angular.module('waitstaff').factory('mealService', [
  'totalEarningsService',
  function (totalEarningsService) {
    let values;
    let meal = {
      reset() {
        values = {
          price: 9.99
        };
        return values;
      },
      checkValues() {
        if (!values
         || !values.price
         || !values.tax
         || !values.tip) {
          throw new Error('Values object is no good.');
        }
        return values;
      },
      bill() {
        let values = this.checkValues(),
            subtotal = values.price * (1 + values.tax / 100),
            tip = subtotal * values.tip / 100;
        return {
          subtotal,
          tip,
          total: subtotal + tip
        };
      },
      emptyBill() {
        return {
          subtotal: 0,
          tip: 0,
          total: 0
        };
      },
      submit() {
        let mealTotals = this.bill();
        totalEarningsService.meals++;
        totalEarningsService.tips += mealTotals.tip;
        totalEarningsService.persist();
        return mealTotals;
      }
    };

    return meal;
  }
]);
