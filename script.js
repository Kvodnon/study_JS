'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = "преподавание",
    addExpenses,
    deposit,
    mission = 60000,
    period = 12;

let start = function() {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));

  addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
  deposit = confirm("Есть ли у вас депозит в банке?");
}

start();

let showTypeOf = function(data) {
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('addExpenses: ', addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

console.log('budgetDay: ', budgetDay);

// 5
let expenses = [];

let getExpensesMonth = function() {
  let sum = 0;
  let cost = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?", 'Тренажерный зал');

    do {
      cost = prompt("Во сколько это обойдется?");
    } while (!isNumber(cost));
    
    sum += +cost;
  }
  
  return sum;
}

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
  return money - expensesAmount;
}

const accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
  return mission / accumulatedMonth;
}

// console.log('getTargetMonth: ', getTargetMonth());
if (Math.ceil(getTargetMonth()) < 0 || Math.ceil(getTargetMonth()) === -0) {
  // 7
  console.log('Цель не будет достигнута :(');
} else {
  console.log('Цель будет достигнута');
}


// 8
budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay: ', budgetDay);

let getStatusIncome = function() {
  if (budgetDay >= 600 & budgetDay < 1200) {
    return 'У вас средний уровень дохода';
  } else if (budgetDay >=0 & budgetDay < 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else if (!budgetDay | budgetDay < 0) {
    return 'Что то пошло не так';
  } else {
    return 'У вас высокий уровень дохода';
  }
} 

console.log(getStatusIncome());
