'use strict';

(function() {
  const selector = '[name="user_phone"]',
    phones = document.querySelectorAll(selector);
  
  phones.forEach((phone) => {
    maskPhone(phone);
  });

  const forms = document.querySelectorAll('[name="user_form"], [name="user_message"]');

  forms.forEach((form) => {
    form.addEventListener("input", () => {
      const target = event.target;

      if (target.matches('[name="user_name"], [name="user_message"]')) {
        target.value = target.value.replace(/[^а-я\s]/i, '');
      }
    });
  });
})();
