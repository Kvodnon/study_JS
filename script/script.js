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
    periodAmount = document.querySelector('.period-amount');    

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

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  depositPercent: 0,
  depositMoney: 0,
  period: 12,
  calculate: function() {
    appData.budget = +salaryAmount.value;

    appData.setData(expensesItems, '.expenses-title', '.expenses-amount', 'expenses');
    appData.setData(incomeItems, '.income-title', '.income-amount', 'incomeMonth');

    appData.getAddExpenses();
    appData.getAddIncome();
    
    appData.getExpensesMonth();
    appData.getBudget();

    appData.setResult();
  },
  setResult: function() {
    budgetMonth.value = appData.budgetMonth;
    budgetDay.value = Math.floor(appData.budgetDay);
    expensesMonth.value = appData.expensesMonth;
    additionalExpense.value = appData.addExpenses.join(', ');
    additionalIncome.value = appData.addIncome.join(', ');
    targetMon.value = Math.ceil(appData.getTargetMonth());
    incomePeriod.value = appData.calcSavedMoney();

    range.addEventListener('input', appData.range);
  },
  addExpensesItem: function() {
    expensesItems = appData.addItem(expensesItems, '.expenses-items', expensesPlus, 3);
  },
  addIncomeItem: function() {
    incomeItems = appData.addItem(incomeItems, '.income-items', incomePlus, 3);
  },
  addItem: function(parent, selector, plus, length) {
    let clone = parent[0].cloneNode(true);

    clone.getElementsByTagName('input')[0].addEventListener('input', appData.replaceExceptString);
    clone.getElementsByTagName('input')[1].addEventListener('input', appData.replaceExceptNumber);
    
    appData.clearValues(clone);
    
    parent[0].parentNode.insertBefore(clone, plus);
    
    parent = document.querySelectorAll(selector);
    
    if (parent.length === length) {
      plus.style.display = 'none';
    }

    return parent;
  },
  setData: function(parent, titleSelector, amountSelector, field) {

    parent.forEach(function(item) {
      let title = item.querySelector(titleSelector).value;
      let amount = item.querySelector(amountSelector).value;
      
      if (title !== '' && amount !== '') {
        if (field === 'expenses') {
          appData[field][title] = +amount;
        } else {
          appData[field] += +amount;
        }
      }
    });
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpenses.value.split(',');

    addExpenses.forEach(function(item) {
      item = item.trim();

      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomes.forEach(function(item) {
      let value = item.value.trim();

      if (value !== '') {
        appData.addIncome.push(value);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return target.value / appData.budgetMonth;
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
    return appData.budgetMonth * range.value;
  },
  range: function(event) {
    periodAmount.textContent = this.value;

    appData.setResult();
  },
  checkSalaryAmount: function() {
    if (this.value !== '') {
      calculate.removeAttribute('disabled');
    } 
    
    if (this.value === '') {
      calculate.setAttribute('disabled', true);
    }
  },
  clearValues: function(parent) {
    let inputs = parent.querySelectorAll('input');

    inputs.forEach(function(input) {
      input.value = '';
    });
  },
  replaceExceptString: function() {
    this.value = this.value.replace(/[^а-я\s,]/,'');
  },
  replaceExceptNumber: function() {
    this.value = this.value.replace(/[^0-9]/,'');
  }
};

calculate.setAttribute('disabled', true);
calculate.addEventListener('click', appData.calculate);

expensesPlus.addEventListener('click', appData.addExpensesItem);
incomePlus.addEventListener('click', appData.addIncomeItem);

salaryAmount.addEventListener('input', appData.checkSalaryAmount);
salaryAmount.addEventListener('input', appData.replaceExceptNumber);

incomeItems[0].getElementsByTagName('input')[0].addEventListener('input', appData.replaceExceptString);
incomeItems[0].getElementsByTagName('input')[1].addEventListener('input', appData.replaceExceptNumber);

additionalIncomes[0].addEventListener('input', appData.replaceExceptString);
additionalIncomes[1].addEventListener('input', appData.replaceExceptString);

expensesItems[0].getElementsByTagName('input')[0].addEventListener('input', appData.replaceExceptString);
expensesItems[0].getElementsByTagName('input')[1].addEventListener('input', appData.replaceExceptNumber);

additionalExpenses.addEventListener('input', appData.replaceExceptString);

target.addEventListener('input', appData.replaceExceptNumber);