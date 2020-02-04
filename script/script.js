'use strict';

let calculate = document.getElementById('start'),
    firstColumn = document.querySelector('.data'),
    cons = firstColumn.getElementsByTagName('button'),
    deposit = document.querySelector('#deposit-check'),
    expenses = document.querySelectorAll('.additional_income-item'),
    values = document.querySelectorAll('[class*="-value"]'),
    incomeMonth = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    select = document.querySelector('.period-select'),
    cancel = document.querySelector('#cancel');
    
console.log('calculate: ', calculate);
console.log('firstColumn: ', firstColumn);
console.log('cons: ', cons);
console.log('deposit: ', deposit);
console.log('expenses: ', expenses);
console.log('values: ', values);
console.log('incomeMonth: ', incomeMonth);
console.log('expensesTitle: ', expensesTitle);
console.log('expensesAmount: ', expensesAmount);
console.log('additionalExpenses: ', additionalExpenses);
console.log('target: ', target);
console.log('select: ', select);
console.log('cancel: ', cancel);