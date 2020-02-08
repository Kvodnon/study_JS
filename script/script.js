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
  incomesClones: [],
  expensesClones: [],
  calculate: function() {
    this.toggleAccessForm(true);

    this.budget = +salaryAmount.value;

    this.setData(expensesItems, '.expenses-title', '.expenses-amount', 'expenses');
    this.setData(incomeItems, '.income-title', '.income-amount', 'incomeMonth');

    this.getAddExpenses();
    this.getAddIncome();
    
    this.getExpensesMonth();
    this.getBudget();

    this.setResult();
  },
  setResult: function() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = Math.floor(this.budgetDay);
    expensesMonth.value = this.expensesMonth;
    additionalExpense.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMon.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcSavedMoney();
  },
  addExpensesItem: function() {
    expensesItems = this.addItem(expensesItems, '.expenses-items', expensesPlus, 3, 'expensesClones');
  },
  addIncomeItem: function() {
    incomeItems = this.addItem(incomeItems, '.income-items', incomePlus, 3, 'incomesClones');
  },
  addItem: function(parent, selector, plus, length, cloneSelector) {
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
  },
  setData: function(parent, titleSelector, amountSelector, field) {
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
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpenses.value.split(',');
    let self = this;

    addExpenses.forEach(function(item) {
      item = item.trim();

      if (item !== '') {
        self.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    let self = this;

    additionalIncomes.forEach(function(item) {
      let value = item.value.trim();

      if (value !== '') {
        self.addIncome.push(value);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  },
  getTargetMonth: function () {
    return target.value / this.budgetMonth;
  },
  getStatusIncome: function () {
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
  },
  getDepositInfo: function () {
    if (this.deposit) {
      this.depositPercent = getVariableValue('Какой годовой процент?', '10', false);
      this.depositMoney = getVariableValue('Какая сумма заложена?', 10000, false);
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * range.value;
  },
  rangeBeforeCalc: function() {
    periodAmount.textContent = range.value;
  },
  rangeAfterCalc: function() {
    this.rangeBeforeCalc();

    this.setResult();
  },
  checkSalaryAmount: function() {
    if (this.value !== '') {
      calculate.disabled = false;
      calculate.style.pointerEvents = 'all';
    } 
    
    if (this.value === '') {
      calculate.disabled = true;
      calculate.style.pointerEvents = 'none';
    }
  },
  clearValues: function(parent) {
    let inputs = parent.querySelectorAll('input'),
        self = this;

    inputs.forEach(function(input) {
      input.value = '';

      if (input.type === 'range') {
        input.value = 1;
        self.rangeBeforeCalc();
      }
    });

  },
  replaceExceptString: function() {
    this.value = this.value.replace(/[^а-я\s,]/,'');
  },
  replaceExceptNumber: function() {
    this.value = this.value.replace(/[^0-9]/,'');
  },
  cancel: function() {
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
  },
  toggleAccessForm: function(access = false) {
    let inputs = data.querySelectorAll('[type="text"],[type="range"]');

    inputs.forEach(function(input) {
      input.disabled = access;
    });

    cancel.style.display = 'block';
    calculate.style.display = 'none';
  },
  removeClones: function() {
    let clones = this.incomesClones.concat(this.expensesClones);

    clones.forEach(function(clone) {
      clone.remove();
  });
  }
};

calculate.disabled = true;
calculate.style.pointerEvents = 'none';
calculate.addEventListener('click', appData.calculate.bind(appData));

cancel.addEventListener('click', function() {
  appData.cancel();
});

expensesPlus.addEventListener('click', function() {
  appData.addExpensesItem();
});
incomePlus.addEventListener('click', function() {
  appData.addIncomeItem();
});

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
range.addEventListener('input', appData.rangeBeforeCalc);