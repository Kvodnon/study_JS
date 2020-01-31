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
      appData.budget = prompt("Ваш месячный доход?", 20000);
    } while (!isNumber(appData.budget));

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    
    for (let counter = 0; counter < 2; counter++) {
      let expense = prompt("Введите обязательную статью расходов?", 'Тренажерный зал');

      let cost = 0;

      do {
        cost = prompt("Во сколько это обойдется?", 1490);
      } while (!isNumber(cost));

      appData.expenses[expense] = +cost;
    }

    console.log(appData.expenses);
  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function() {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  }, 
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  }, 
  getTargetMonth: function() {
    return appData.mission / appData.budgetMonth;
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

appData.getExpensesMonth();
appData.getBudget();

let targetMonth = appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Уровень дохода: ', appData.budgetDay);
console.log('За какой период будет достигнута цель (в месяцах): ', Math.ceil(targetMonth));

console.log('Наша программа включает в себя данные:');

for (let key in appData) {
  console.log(key + ': ', appData[key]);
}