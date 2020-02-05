'use strict';

let calculate = document.getElementById('start'),
    firstColumn = document.querySelector('.data'),
    cons = firstColumn.getElementsByTagName('button'),
    deposit = document.querySelector('#deposit-check'),
    expenses = document.querySelectorAll('.additional_income-item'),
    incomeMonth = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    select = document.querySelector('.period-select'),
    cancel = document.querySelector('#cancel'),
    budgetMonth = document.querySelector('.budget_month-value'),
    expensesMonth = document.querySelector('.expenses_month-value'),
    additionalIncome = document.querySelector('.additional_income-value'),
    additionalExpense = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    targetMonth = document.querySelector('.target_month-value'),
    budgetDay = document.querySelector('.budget_day-value'), 
    incomePlus = cons[0],
    expensesPlus = cons[1];    

console.log('calculate: ', calculate);
console.log('firstColumn: ', firstColumn);
console.log('cons: ', cons);
console.log('deposit: ', deposit);
console.log('expenses: ', expenses);
console.log('incomeMonth: ', incomeMonth);
console.log('expensesTitle: ', expensesTitle);
console.log('expensesAmount: ', expensesAmount);
console.log('additionalExpenses: ', additionalExpenses);
console.log('target: ', target);
console.log('select: ', select);
console.log('cancel: ', cancel);
console.log('budgetMonth: ', budgetMonth);
console.log('budgetDay: ', budgetDay);
console.log('expensesMonth: ', expensesMonth);
console.log('additionalIncome: ', additionalIncome);
console.log('additionalExpense: ', additionalExpense);
console.log('incomePeriod: ', incomePeriod);
console.log('targetMonth: ', targetMonth);
console.log('incomePlus: ', incomePlus);
console.log('expensesPlus: ', expensesPlus);