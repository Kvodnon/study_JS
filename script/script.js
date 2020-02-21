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
      menu = document.querySelector('menu');

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

    const clickMenu = event => {
      const target = event.target;

      if (target.matches('.close-btn, a') || !target.closest('menu')) {
        menuHandler();
      }
    };

    if (window.innerWidth > 768) {
      menuBtn.addEventListener('click', menuHandler);
      menu.addEventListener('click', clickMenu);
    }

    screen.orientation.addEventListener('change', () => {
      if (screen.width < 769) {
        menuBtn.removeEventListener('click', menuHandler);
        menu.removeEventListener('click', clickMenu);
      } else {
        menuBtn.addEventListener('click', menuHandler);
        menu.addEventListener('click', clickMenu);
      }
    });
  };

  toggleMenu();

  const openPopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtns = document.querySelectorAll('.popup-btn');

    for (const btn of popupBtns) {
      btn.addEventListener('click', () => {
        popup.style.display = 'block';
      });
    }

    popup.addEventListener('click', event => {
      const target = event.target;

      if (target.matches('.popup-close') || !target.closest('.popup-content')) {
        popup.style.display = 'none';
      }
    });
  };

  openPopup();

  const initMouseClick = () => {
    const mouse = document.querySelector('a[href="#service-block"]'),
      serviceBlock = document.getElementById('service-block'),
      scrollStep = 40,
      menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul > li > a');

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
        toSecondScreen(event, document.querySelector(this.getAttribute('href')));
      });
    }
  };

  initMouseClick();

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tabs = document.querySelectorAll('.service-header-tab'),
      tabsContent = document.querySelectorAll('.service-tab');

    const toogleContent = index => {
      for (const content in [...tabsContent]) {
        if (content === index) {
          tabs[content].classList.add('active');
          tabsContent[content].classList.remove('d-none');
        } else {
          tabs[content].classList.remove('active');
          tabsContent[content].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', () => {
      let target = event.target;

      target = target.closest('.service-header-tab');

      if (target) {
        for (const tab in [...tabs]) {
          if (tabs[tab] === target) {
            toogleContent(tab);
          }
        }
      }

    });
  };

  tabs();
});