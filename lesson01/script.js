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