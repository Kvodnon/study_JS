'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 60000,
  period: 12,
  asking: function() {
    do {
      appData.budget = prompt("Ваш месячный доход?");
    } while (!isNumber(appData.budget));

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function() {
    let cost = 0;

    for (let i = 0; i < 2; i++) {
      appData.expenses[i] = prompt("Введите обязательную статью расходов?", 'Тренажерный зал');

      do {
        cost = prompt("Во сколько это обойдется?");
      } while (!isNumber(cost));

      appData.budgetMonth += +cost;
    }
  }, 
  getAccumulatedMonth: function() {
    return appData.budget - appData.budgetMonth;
  }, 
  getTargetMonth: function() {
    return appData.mission / appData.getAccumulatedMonth();
  }, 
  getStatusIncome: function() {
    let message;

    if (appData.budgetDay >= 600 & appData.budgetDay < 1200) {
      message = 'У вас средний уровень дохода';
    } else if (appData.budgetDay >=0 & appData.budgetDay < 600) {
      message = 'К сожалению у вас уровень дохода ниже среднего';
    } else if (!appData.budgetDay | appData.budgetDay < 0) {
      message = 'Что то пошло не так';
    } else {
      message = 'У вас высокий уровень дохода';
    }

    return message;
  }
};

appData.asking();

console.log('addExpenses: ', appData.addExpenses.length);

console.log('Период равен ' + appData.period + ' месяцев');
console.log('Цель заработать ' + appData.mission + ' рублей');

appData.budgetDay = appData.budget / 30;

console.log('budgetDay: ', appData.budgetDay);

appData.getExpensesMonth();

let targetMonth = appData.getTargetMonth();

// console.log('targetMonth: ', targetMonth);
// console.log('targetMonth: ', Math.ceil(targetMonth));
if (targetMonth < 0) {
  // 7
  console.log('Цель не будет достигнута :(');
} else {
  console.log('Цель будет достигнута');
}

// 8
appData.budgetDay = Math.floor(appData.getAccumulatedMonth() / 30);
console.log('budgetDay: ', appData.budgetDay);

console.log(appData.getStatusIncome());
