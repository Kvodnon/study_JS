'use strict';

let calculate = document.getElementById('start'),
    firstColumn = document.querySelector('.data'),
    cons = firstColumn.getElementsByTagName('button'),
    deposit = document.querySelector('#deposit-check'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalIncomes = document.querySelectorAll('.additional_income-item'),
    salaryAmount = document.querySelector('.salary-amount'),
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select'),
    cancel = document.querySelector('#cancel'),
    budgetMonth = document.querySelector('.budget_month-value'),
    expensesMonth = document.querySelector('.expenses_month-value'),
    additionalIncome = document.querySelector('.additional_income-value'),
    additionalExpense = document.querySelector('.additional_expenses-value'),
    incomePeriod = document.querySelector('.income_period-value'),
    targetMon = document.querySelector('.target_month-value'),
    budgetDay = document.querySelector('.budget_day-value'), 
    incomePlus = cons[0],
    expensesPlus = cons[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    periodAmount = document.querySelector('.period-amount'),
    data = document.querySelector('.data');    

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

    return isNumber(parseInt(answer.split('').sort().join('')));
  };
  
  do {
    answer = prompt(question, byDefault);
  } while (callback());

  return answer;
};

const AppData = function() {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.depositPercent = 0;
  this.depositMoney = 0;
  this.period = 12;
  this.incomesClones = [];
  this.expensesClones = [];

  calculate.disabled = true;
  calculate.style.pointerEvents = 'none';
};

AppData.prototype.calculate = function() {
  this.toggleAccessForm(true);

  this.budget = +salaryAmount.value;

  this.setData(expensesItems, '.expenses-title', '.expenses-amount', 'expenses');
  this.setData(incomeItems, '.income-title', '.income-amount', 'incomeMonth');

  this.getAddExpenses();
  this.getAddIncome();
  
  this.getExpensesMonth();
  this.getBudget();

  this.setResult();
};
AppData.prototype.setResult = function() {
  budgetMonth.value = this.budgetMonth;
  budgetDay.value = Math.floor(this.budgetDay);
  expensesMonth.value = this.expensesMonth;
  additionalExpense.value = this.addExpenses.join(', ');
  additionalIncome.value = this.addIncome.join(', ');
  targetMon.value = Math.ceil(this.getTargetMonth());
  incomePeriod.value = this.calcSavedMoney();
};
AppData.prototype.addExpensesItem = function() {
  expensesItems = this.addItem(expensesItems, '.expenses-items', expensesPlus, 3, 'expensesClones');
};
AppData.prototype.addIncomeItem = function() {
  incomeItems = this.addItem(incomeItems, '.income-items', incomePlus, 3, 'incomesClones');
};
AppData.prototype.addItem = function(parent, selector, plus, length, cloneSelector) {
  let clone = parent[0].cloneNode(true);

  clone.getElementsByTagName('input')[0].addEventListener('input', this.replaceExceptString);
  clone.getElementsByTagName('input')[1].addEventListener('input', this.replaceExceptNumber);
  
  this.clearValues(clone);
  
  parent[0].parentNode.insertBefore(clone, plus);
  
  parent = document.querySelectorAll(selector);

  this[cloneSelector].push(clone);
  
  if (parent.length === length) {
    plus.style.display = 'none';
  }

  return parent;
};
AppData.prototype.setData = function(parent, titleSelector, amountSelector, field) {
  let self = this;

  parent.forEach(function(item) {
    let title = item.querySelector(titleSelector).value;
    let amount = item.querySelector(amountSelector).value;
    
    if (title !== '' && amount !== '') {
      if (field === 'expenses') {
        self[field][title] = +amount;
      } else {
        self[field] += +amount;
      }
    }
  });
};
AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpenses.value.split(',');
  let self = this;

  addExpenses.forEach(function(item) {
    item = item.trim();

    if (item !== '') {
      self.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function() {
  let self = this;

  additionalIncomes.forEach(function(item) {
    let value = item.value.trim();

    if (value !== '') {
      self.addIncome.push(value);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += this.expenses[key];
  }
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function () {
  return target.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  let message;

  if (this.budgetDay >= 600 & this.budgetDay < 1200) {
    message = 'У вас средний уровень дохода';
  } else if (this.budgetDay >= 0 & this.budgetDay < 600) {
    message = 'К сожалению у вас уровень дохода ниже среднего';
  } else if (!this.budgetDay | this.budgetDay < 0) {
    message = 'Что то пошло не так';
  } else {
    message = 'У вас высокий уровень дохода';
  }

  return message;
};
AppData.prototype.getDepositInfo = function () {
  if (this.deposit) {
    this.depositPercent = getVariableValue('Какой годовой процент?', '10', false);
    this.depositMoney = getVariableValue('Какая сумма заложена?', 10000, false);
  }
};
AppData.prototype.calcSavedMoney = function () {
  return this.budgetMonth * range.value;
};
AppData.prototype.rangeBeforeCalc = function() {
  periodAmount.textContent = range.value;
};
AppData.prototype.rangeAfterCalc = function() {
  this.rangeBeforeCalc();

  this.setResult();
};
AppData.prototype.checkSalaryAmount = function() {
  if (this.value !== '') {
    calculate.disabled = false;
    calculate.style.pointerEvents = 'all';
  } 
  
  if (this.value === '') {
    calculate.disabled = true;
    calculate.style.pointerEvents = 'none';
  }
};
AppData.prototype.clearValues = function(parent) {
  let inputs = parent.querySelectorAll('input'),
      self = this;

  inputs.forEach(function(input) {
    input.value = '';

    if (input.type === 'range') {
      input.value = 1;
      self.rangeBeforeCalc();
    }
  });

};
AppData.prototype.replaceExceptString = function() {
  this.value = this.value.replace(/[^а-я\s,]/,'');
};
AppData.prototype.replaceExceptNumber = function() {
  this.value = this.value.replace(/[^0-9]/,'');
};
AppData.prototype.cancel = function() {
  this.budgetDay = 0;
  this.incomeMonth = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.addIncome = [];
  this.expenses = {};
  this.income = {};

  this.toggleAccessForm();
  this.removeClones();

  calculate.style.display = 'block';
  cancel.style.display = 'none';

  this.clearValues(document);

  this.checkSalaryAmount.call({value: salaryAmount.value});
};
AppData.prototype.toggleAccessForm = function(access = false) {
  let inputs = data.querySelectorAll('[type="text"],[type="range"]');

  inputs.forEach(function(input) {
    input.disabled = access;
  });

  cancel.style.display = 'block';
  calculate.style.display = 'none';
};
AppData.prototype.removeClones = function() {
  let clones = this.incomesClones.concat(this.expensesClones);

  clones.forEach(function(clone) {
    clone.remove();
});
};
AppData.prototype.eventListeners = function() {
  calculate.addEventListener('click', this.calculate.bind(this));

  cancel.addEventListener('click', this.cancel.bind(this));
  
  expensesPlus.addEventListener('click', this.addExpensesItem.bind(this));
  incomePlus.addEventListener('click', this.addIncomeItem.bind(this));
  
  salaryAmount.addEventListener('input', this.checkSalaryAmount);
  salaryAmount.addEventListener('input', this.replaceExceptNumber);
  
  incomeItems[0].getElementsByTagName('input')[0].addEventListener('input', this.replaceExceptString);
  incomeItems[0].getElementsByTagName('input')[1].addEventListener('input', this.replaceExceptNumber);
  
  additionalIncomes[0].addEventListener('input', this.replaceExceptString);
  additionalIncomes[1].addEventListener('input', this.replaceExceptString);
  
  expensesItems[0].getElementsByTagName('input')[0].addEventListener('input', this.replaceExceptString);
  expensesItems[0].getElementsByTagName('input')[1].addEventListener('input', this.replaceExceptNumber);
  
  additionalExpenses.addEventListener('input', this.replaceExceptString);
  
  target.addEventListener('input', this.replaceExceptNumber);
  range.addEventListener('input', this.rangeBeforeCalc);
};

const appData = new AppData();
appData.eventListeners();

