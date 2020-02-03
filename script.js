'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let getVariableValue = function(question, byDefault, flag) {
  // let flag - если true - проверка на число, если false - проверка на текст
  let answer;
  
  var callback = function() {
    if (!flag) {
      return !isNumber(answer);
    }

    return isNumber(answer);
  };
  
  do {
    answer = prompt(question, byDefault);
  } while (callback());

  return answer;
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  depositPercent: 0,
  depositMoney: 0,
  mission: 60000,
  period: 12,
  asking: function () {

    if (confirm('У вас есть дополнительные доходы?')) {
      let incomeItem = getVariableValue('Какой дополнительный заработок?', 'музыкант', true),
          incomeCash = getVariableValue('Сколько Вы на этом зарабатываете?', 10000, false);

      appData.income[incomeItem] = +incomeCash;
    }

    appData.budget = getVariableValue('Ваш месячный доход?', 20000, false);

    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", 'test, kek');
    appData.addExpenses = addExpenses.toLowerCase().trim().split(',');

    appData.deposit = confirm("Есть ли у вас депозит в банке?");


    for (let counter = 0; counter < 2; counter++) {
      let expense = getVariableValue('Введите обязательную статью расходов?', 'Тренажерный зал', true),
          cost = getVariableValue('Во сколько это обойдется?', 1490, false);

      appData.expenses[expense] = +cost;
    }

    console.log(appData.expenses);
  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    let message;

    if (appData.budgetDay >= 600 & appData.budgetDay < 1200) {
      message = 'У вас средний уровень дохода';
    } else if (appData.budgetDay >= 0 & appData.budgetDay < 600) {
      message = 'К сожалению у вас уровень дохода ниже среднего';
    } else if (!appData.budgetDay | appData.budgetDay < 0) {
      message = 'Что то пошло не так';
    } else {
      message = 'У вас высокий уровень дохода';
    }

    return message;
  },
  getDepositInfo: function () {
    if (appData.deposit) {
      appData.depositPercent = getVariableValue('Какой годовой процент?', '10', false);
      appData.depositMoney = getVariableValue('Какая сумма заложена?', 10000, false);
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();

appData.getDepositInfo();
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


let stack = [];

for (let key of appData.addExpenses) {
  stack.push(key.trim().charAt(0).toUpperCase() + key.trim().substring(1));
}

console.log(stack);
console.log('Возможные расходы: ', stack.join(', '));