import validator from "validator";

class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    
    this.formElements = [...this.form.elemetns].filter(item => {
      return item.tagName !== 'BUTTON' && item.type !== 'button';
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPatern();
    this.formElements.forEach(input => input.addEventListener('change', this.chekIt.bind(this)));
    this.form.addEventListener('submit', () => {
      this.formElements.forEach(item => this.checkIt({target: item}));
      if (this.error.size) {
        event.preventDefault();
      }
    });
  }

  isValid(input) {
    const validatorMetod = {
      notEmpty(input) {
        if (input.value.trim === '') {
          return false;
        }

        return true;
      },
      pattern(input, pattern) {
        return pattern.test(input.value);
      }
    };

    if (this.method) {
      const method = this.method[input.id];
  
      if (method) {
        return method.every(item => {
          return validatorMetod[item[0]](input, this.pattern[item[1]]);
        });
      }
    } else {
      console.warn('Необходимо передать идентификатор полей ввода и методы проверки этих пооей');
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(input) {
    input.classList.remove('success');
    input.classList.add('error');

    if (input.nextElementSibling && input.nextElementSibling.classList.contains('validator_error')) {
      return;
    }

    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator_error');
    Element.inserAdjacentElement('afterend', errorDiv);
  }
  
  showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');

    if (input.nextElementSibling && input.nextElementSibling.classList.contains('validator_error')) {
      input.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = doucment.createElement('style');

    style.textContent = `
      input.success {
        border: 2px solid green
      }

      input.error {
        border: 2px solid red
      }

      validator_error {
        font-family: sans-serif;
        font-size: 12px;
        color: red;
      }
    `;

    document.head.appendChild(style);
  }

  setPatern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}

const valid = new Validator({
  selector: '#myform',
  pattern: {
    phone: /^\d+$/
  },
  method: {
    'phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'email': [
      ['pattern', 'email']
    ]
  }
});

valid.init();