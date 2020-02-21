'use strict';

window.addEventListener('DOMContentLoaded', () => {

  function countTimer(deadline) {
    const timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds');

    function addZero(number) {
      number += '';

      if (number.length === 1) {
        number = '0' + number;
      }

      return number;
    }

    function checkRemaining(timer) {
      if (timer.timeRemaining <= 0) {
        return {
          timeRemaining: timer.timeRemaining,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return timer;
    }

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      return checkRemaining({
        timeRemaining,
        hours,
        minutes,
        seconds
      });
    }


    function updateClock() {
      const timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);
    }

    updateClock();
  }

  // countTimer('23 february 2020');
  setInterval(countTimer, 1000, '21 february 2020');

  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      btnClose = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul > li');

    let transformFrame,
      transformValue = 0;

    function ValueCounter() {
      let counter = 0;
      const step = 4;

      return function() {
        counter += step;

        return counter;
      };
    }

    let transformCounter = new ValueCounter();

    const flowMenu = () => {
      transformFrame = requestAnimationFrame(flowMenu);

      if (transformValue === 100) {
        cancelAnimationFrame(transformFrame);
        return;
      }

      transformValue = transformCounter();
      menu.style.transform = `translate(${transformValue}%)`;
    };

    const checkAnimateCondition = () => {
      if (transformValue === 0) {
        return true;
      }

      return false;
    };

    const menuHandler = () => {
      if (checkAnimateCondition()) {
        transformCounter = new ValueCounter();
        transformValue = 0;

        transformFrame = requestAnimationFrame(flowMenu);
      }

      if (transformValue === 100) {
        menu.style.transform = 'translate(-100%)';
        transformValue = 0;
      }
    };

    if (window.innerWidth > 768) {
      menuBtn.addEventListener('click', menuHandler);
      btnClose.addEventListener('click', menuHandler);
    }

    for (const item of menuItems) {
      item.addEventListener('click', menuHandler);
    }

    screen.orientation.addEventListener('change', () => {
      if (screen.width < 769) {
        menuHandler();
        menuBtn.removeEventListener('click', menuHandler);
        btnClose.removeEventListener('click', menuHandler);
      } else {
        menuBtn.addEventListener('click', menuHandler);
        btnClose.addEventListener('click', menuHandler);
      }
    });
  };


  toggleMenu();

  const openPopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtns = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    for (const btn of popupBtns) {
      btn.addEventListener('click', () => {
        popup.style.display = 'block';
      });
    }

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };

  openPopup();
});
