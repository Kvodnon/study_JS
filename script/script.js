'use strict';

const calculate = document.getElementById('start'),
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

const isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getVariableValue = function(question, byDefault, flag) {
  // let flag - если true - проверка на число, если false - проверка на текст
  let answer;
  
  const callback = () => {
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

const replaceExcept = function(value, exp) {
  return value.replace(exp, '');
};

const replaceExceptString = function() {
  this.value = replaceExcept(this.value, /[^а-я\s,]/);
};

const replaceExceptNumber = function() {
  this.value = replaceExcept(this.value, /[^0-9]/);
};

const rangeBeforeCalc = () => {
  periodAmount.textContent = range.value;
};

class AppData {
  constructor() {
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
    this.expensesClones = [];
    this.incomeClones = [];
  }

  calculate() {
    this.toggleAccessForm(true);
  
    this.budget = +salaryAmount.value;
  
    this.setData(expensesItems, '.expenses-title', '.expenses-amount', 'expenses');
    this.setData(incomeItems, '.income-title', '.income-amount', 'incomeMonth');
    
    this.setAdditionals();
    
    this.getExpensesMonth();
    this.getBudget();
  
    this.setResult();
  }

  setResult() {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = Math.floor(this.budgetDay);
    expensesMonth.value = this.expensesMonth;
    additionalExpense.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    targetMon.value = Math.ceil(this.getTargetMonth());
    incomePeriod.value = this.calcSavedMoney();
  }
  
  addItem(event, length = 3) {
    const row = event.target.previousElementSibling;
    const className = row.className;
    const selector = className.split('-')[0];

    const clone = row.cloneNode(true);
    const inputs = clone.getElementsByTagName('input');

    inputs[0].addEventListener('input', this.replaceExceptString);
    inputs[1].addEventListener('input', this.replaceExceptNumber);
    
    this.clearValues(clone);
    
    row.parentNode.insertBefore(clone, event.target);
  
    this[`${selector}Clones`].push(clone);
    
    if (this[`${selector}Clones`].length === length - 1) {
      event.target.style.display = 'none';
    }
  }
  
  setData(parent, titleSelector, amountSelector, field) {
    parent.forEach(item => {
      let title = item.querySelector(titleSelector).value;
      let amount = item.querySelector(amountSelector).value;
      
      if (title !== '' && amount !== '') {
        if (field === 'expenses') {
          this[field][title] = +amount;
        } else {
          this[field] += +amount;
        }
      }
    });
  }
  
  setAdditionals() {
    const set = (items, property) => {
      items.forEach(item => {
        item = item.trim();
    
        if (item !== '') {
          this[property].push(item);
        }
      });
    };

    const expenses = additionalExpenses.value.split(','),
      incomes = [];

    additionalIncomes.forEach((income) => {
      incomes.push(income.value);
    });

    set(expenses, 'addExpenses');
    set(incomes, 'addIncome');
  }
  
  getExpensesMonth () {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }
  
  getBudget () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }
  
  getTargetMonth () {
    return target.value / this.budgetMonth;
  }
  
  getStatusIncome () {
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
  }
  
  getDepositInfo () {
    if (this.deposit) {
      this.depositPercent = getVariableValue('Какой годовой процент?', '10', false);
      this.depositMoney = getVariableValue('Какая сумма заложена?', 10000, false);
    }
  }
  
  calcSavedMoney () {
    return this.budgetMonth * range.value;
  }
  
  rangeAfterCalc() {
    rangeBeforeCalc();
  
    this.setResult();
  }
  
  checkSalaryAmount() {
    if (this.value !== '') {
      calculate.disabled = false;
      calculate.style.pointerEvents = 'all';
    } 
    
    if (this.value === '') {
      calculate.disabled = true;
      calculate.style.pointerEvents = 'none';
    }
  }

  clearValues(parent) {
    const inputs = parent.querySelectorAll('input');
  
    inputs.forEach(input => {
      input.value = '';
  
      if (input.type === 'range') {
        input.value = 1;
        rangeBeforeCalc();
      }
    });
  
  }
  
  cancel() {
    this.toggleAccessForm();
    this.removeClones();
    
    calculate.style.display = 'block';
    cancel.style.display = 'none';
    
    this.clearValues(document);
    
    this.checkSalaryAmount.call({value: salaryAmount.value});
    
    Object.assign(this, new this.constructor());
  }
  
  toggleAccessForm(access = false) {
    const inputs = data.querySelectorAll('[type="text"],[type="range"]');
  
    inputs.forEach(input => {
      input.disabled = access;
    });
  
    cancel.style.display = 'block';
    calculate.style.display = 'none';
  }
  
  removeClones() {
    const clones = this.incomeClones.concat(this.expensesClones);
  
    clones.forEach(clone => {
      clone.remove();
    });
  }
  
  eventListeners() {
    const amountInputs = document.querySelectorAll('input[class$="-amount"]'),
      stringInputs = document.querySelectorAll('input[class$="-item"], input[class$="-title"]');

    amountInputs.forEach((input) => {
      input.addEventListener('input', replaceExceptNumber);
    });

    stringInputs.forEach((input) => {
      input.addEventListener('input', replaceExceptString);
    });

    calculate.addEventListener('click', this.calculate.bind(this));
  
    cancel.addEventListener('click', this.cancel.bind(this));
    
    expensesPlus.addEventListener('click', (event) => {
      this.addItem(event);
    });
    incomePlus.addEventListener('click', (event) => {
      this.addItem(event);
    });
    
    salaryAmount.addEventListener('input', this.checkSalaryAmount);
    
    range.addEventListener('input', rangeBeforeCalc);
  }
}

calculate.disabled = true;
calculate.style.pointerEvents = 'none';

const appData = new AppData();
appData.eventListeners();

