'use strict';

let money = 10000,
    income = "преподавание",
    addExpenses = "Тренажерный зал, Спортивное питание, Досуг",
    deposit = false,
    mission = 60000,
    period = 12;

let showTypeOf = function(data) {
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('addExpenses: ', addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');


let budgetDay = money / 30;

console.log('budgetDay: ', budgetDay);

money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");

console.log(addExpenses.toLowerCase().split(', '));

// 5
let expenses1 = prompt("Введите первую обязательную статью расходов?");
let amount1 = prompt("Во сколько это обойдется?");

let expenses2 = prompt("Введите вторую обязательную статью расходов?");
let amount2 = prompt("Во сколько это обойдется?");

let getExpensesMonth = function() {
  return +amount1 + +amount2;
}

let expensesMonth = getExpensesMonth();

let getAccumulatedMonth = function() {
  return money - expensesMonth;
}

const accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
  return mission / accumulatedMonth;
}

// 7
console.log('Цель будет достигнута за месяцев:', Math.ceil(getTargetMonth()));

// 8
budgetDay = Math.floor(accumulatedMonth / 30);
console.log('budgetDay: ', budgetDay);

let getStatusIncome = function(budgetDay) {
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

getStatusIncome(budgetDay);
