import angular from 'angular';

angular.module('waitstaff').value('totalEarnings', {
  meals: 0,
  tips: 0,
  avgTip() {
    return this.tips / this.meals;
  },
  reset() {
    this.meals = 0;
    this.tips = 0;
  }
});
