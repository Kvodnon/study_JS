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
      transformValue = -100;

    function ValueCounter() {
      let counter = 0;
      const step = 4;

      return function () {
        counter += step;

        return counter;
      };
    }

    let transformCounter = new ValueCounter();

    const flowMenu = () => {
      transformFrame = requestAnimationFrame(flowMenu);

      if (transformValue === 0) {
        cancelAnimationFrame(transformFrame);
        return;
      }

      transformValue = -100 + transformCounter();
      menu.style.transform = `translate(${transformValue}%)`;
    };

    const checkAnimateCondition = () => {
      if (transformValue === -100) {
        return true;
      }

      return false;
    };

    const menuHandler = () => {
      if (checkAnimateCondition()) {
        transformCounter = new ValueCounter();
        transformValue = -100;

        transformFrame = requestAnimationFrame(flowMenu);
      }

      if (transformValue === 0) {
        menu.style.transform = 'translate(-100%)';
        transformValue = -100;
      }
    };

    menuBtn.addEventListener('click', menuHandler);
    btnClose.addEventListener('click', menuHandler);

    for (const item of menuItems) {
      item.addEventListener('click', menuHandler);
    }
  };

  toggleMenu();

  const openPopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      popupBtns = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close');

    const animatePopup = () => {
      popupContent.style.transition = 'opacity .4s';
      popup.style.transition = 'opacity .4s';
      popupContent.style.opacity = 0;
      popup.style.opacity = 0;
      popup.style.display = 'block';

      setTimeout(() => {
        popupContent.style.opacity = 1;
        popup.style.opacity = 1;
      }, 50);
    };

    if (window.innerWidth > 768) {
      for (const btn of popupBtns) {
        btn.addEventListener('click', animatePopup);
      }
    } else {
      for (const btn of popupBtns) {
        btn.addEventListener('click', () => {
          popup.style.display = 'block';
        });
      }
    }

    if (window.innerWidth > 768) {
      popupClose.addEventListener('click', () => {
        popupContent.style.opacity = 0;
        popup.style.opacity = 0;

        setTimeout(() => {
          popup.style.display = 'none';
        }, 400);
      });
    } else {
      popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    }

  };

  openPopup();

  const initMouseClick = () => {
    const mouse = document.querySelector('a[href="#service-block"]'),
      serviceBlock = document.getElementById('service-block'),
      scrollStep = 40,
      menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul > li');

    let frameId;


    function translateScroll(offsetTop) {
      frameId = requestAnimationFrame(translateScroll.bind(this, offsetTop));

      const difference = offsetTop - ((offsetTop % window.scrollY) % scrollStep),
        scrollBottom = window.document.documentElement.offsetHeight - window.document.documentElement.clientHeight;

      if (window.scrollY === difference || window.scrollY === scrollBottom) {
        cancelAnimationFrame(frameId);
        document.documentElement.scrollTop = offsetTop;
        return;
      }

      document.documentElement.scrollTop += scrollStep;
    }

    function toSecondScreen(event, block) {
      event.preventDefault();
      frameId = requestAnimationFrame(translateScroll.bind(this, block.offsetTop));
    }

    mouse.addEventListener('click', event => {
      toSecondScreen(event, serviceBlock);
    });

    for (const item of menuItems) {
      item.addEventListener('click', function (event) {
        toSecondScreen(event, document.querySelector(this.querySelector('a').getAttribute('href')));
      });
    }
  };

  initMouseClick();
});