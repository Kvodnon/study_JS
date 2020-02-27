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
    const menu = document.querySelector('menu'),
      body = document.getElementsByTagName('body')[0];

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

    const closeMenu = () => {
      if (transformValue === 0) {
        menu.style.transform = 'translate(-100%)';
        transformValue = -100;
      }
    };

    const clickMenu = event => {
      const target = event.target;

      if (target.matches('.close-btn, ul > li > a, .menu') || target.closest('.menu')) {
        menuHandler();
      } else if (!target.closest('menu')) {
        closeMenu();
      }
    };

    body.addEventListener('click', clickMenu);
  };

  toggleMenu();

  const openPopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      serviceBlock = document.getElementById('service-block');

    const animatePopup = () => {
      const target = event.target;

      if (!target.matches('.popup-btn')) return;

      if (window.innerWidth > 768) {
        popupContent.style.transition = 'opacity .4s';
        popup.style.transition = 'opacity .4s';
        popupContent.style.opacity = 0;
        popup.style.opacity = 0;

        setTimeout(() => {
          popupContent.style.opacity = 1;
          popup.style.opacity = 1;
        }, 50);
      }

      popup.style.display = 'block';
    };

    const closePopup = () => {
      if (window.innerWidth > 768) {
        popupContent.style.opacity = 0;
        popup.style.opacity = 0;

        setTimeout(() => {
          popup.style.display = 'none';
        }, 400);
      } else {
        popup.style.display = 'none';
      }
    };

    serviceBlock.addEventListener('click', animatePopup);

    popup.addEventListener('click', event => {
      const target = event.target;

      if (target.matches('.popup-close') || !target.closest('.popup-content')) {
        closePopup();
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

  const slider = () => {
    const slides = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, selector) => {
      elem[index].classList.remove(selector);
    };

    const nextSlide = (elem, index, selector) => {
      elem[index].classList.add(selector);
    };

    const createDots = () => {
      const dots = document.createElement('ul'),
        list = [];
      dots.classList.add('portfolio-dots');

      slides.forEach(() => {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        list.push(dot);
        dots.appendChild(dot);
      });

      slider.appendChild(dots);

      return list;
    };

    const dots = createDots();
    nextSlide(dots, currentSlide, 'dot-active');

    const autoPlay = () => {
      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide === slides.length) {
        currentSlide = 0;
      }
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlider = (time = 3000) => {
      interval = setInterval(autoPlay, time);
    };

    const stopSlider = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      }

      if (target.matches('#arrow-left')) {
        currentSlide--;
      }

      if (target.matches('.dot')) {
        dots.forEach((dot, index) => {
          if (dot === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slides.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }

      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    });


    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        stopSlider();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn, .dot')) {
        startSlider();
      }
    });



    startSlider(1500);
  };

  slider();

  const team = () => {
    const command = document.getElementById('command');

    const toggleImg = () => {
      const target = event.target;

      if (!target.matches('img')) return;

      [target.dataset.img, target.src] = [target.src, target.dataset.img];
    };

    command.addEventListener('mouseover', toggleImg);
    command.addEventListener('mouseout', toggleImg);
  };

  team();

  const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const replaceToNumber = () => {
      const target = event.target;
      
      if (!target.matches('input'));

      target.value = target.value.replace(/[^\d]/, '');
    };

    calcBlock.addEventListener('input', replaceToNumber);

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1,
        tempTotal = 0,
        interval;

      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (+calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      const animateTotal = () => {
        interval = requestAnimationFrame(animateTotal);

        tempTotal += 4;

        if (tempTotal >= total) {
          totalValue.textContent = parseInt(total);
          cancelAnimationFrame(interval);
          return;
        }

        totalValue.textContent = tempTotal;
      };

      interval = requestAnimationFrame(animateTotal);
    };

    calcBlock.addEventListener('change', () => {
      const target = event.target;

      if (!target.matches('select, input')) return;

      countSum();
    });
  };

  calculator();
});
