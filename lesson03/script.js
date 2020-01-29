'use strict';

let money = 10000,
    income = "преподавание",
    addExpenses = "Тренажерный зал, Спортивное питание, Досуг",
    deposit = false,
    mission = 60000,
    period = 12;
    
console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log('addExpenses: ', addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;

console.log('budgetDay: ', budgetDay);

money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");

// let expenses1 = prompt("Введите обязательную статью расходов?");
// let expenses2 = prompt("Введите обязательную статью расходов?");

// let amount1 = prompt("Во сколько это обойдется?");
// let amount2 = prompt("Во сколько это обойдется?");

let budgetMonth = +money - +addExpenses;
budgetDay = budgetMonth / 30;

console.log('Цель будет достигнута за месяцев:', Math.ceil(mission / budgetMonth));

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
}

if (budgetDay > 600 & budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
}

if (budgetDay >=0 & budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');

} 

if (budgetDay < 0) {
  console.log('Что то пошло не так');
}
