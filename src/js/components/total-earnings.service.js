import angular from 'angular';

angular.module('waitstaff').factory('totalEarningsService', [
  'localStorageService',
  function (localStorageService) {
    let totalEarnings = {
      meals: 0,
      tips: 0,
      avgTip() {
        return this.tips / this.meals || 0;
      },
      persist() {
        localStorageService.set(
          'totalEarnings',
          { meals: this.meals,
            tips: this.tips });
      },
      reset() {
        this.meals = 0;
        this.tips = 0;
        this.persist();
      }
    };

    let previousTotals = localStorageService.get('totalEarnings');
    if (previousTotals) {
      totalEarnings.meals = previousTotals.meals;
      totalEarnings.tips = previousTotals.tips;
    }

    return totalEarnings;
  }
]);
