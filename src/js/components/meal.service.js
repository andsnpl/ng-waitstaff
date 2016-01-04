import angular from 'angular';

angular.module('waitstaff').factory('meal', [
  'totalEarnings',
  function (totalEarnings) {
    return {
      reset() {
        this.values = {
          price: 9.99
        };
        return this.values;
      },
      checkValues() {
        if (!this.values
         || !this.values.price
         || !this.values.tax
         || !this.values.tip) {
          throw new Error('Values object is no good.');
        }
        return this.values;
      },
      bill() {
        let values = this.checkValues(),
            subtotal = values.price * (1 + values.tax),
            tip = subtotal * values.tip;
        return {
          subtotal,
          tip,
          total: subtotal + tip
        };
      },
      submit() {
        let mealTotals = this.bill();
        totalEarnings.meals++;
        totalEarnings.tips += mealTotals.tip;
        return mealTotals;
      }
    };
  }
]);
