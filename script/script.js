'use strict';

window.addEventListener('DOMContentLoaded', () => {
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

  function countTimer(deadline) {
    function checkRemaining(timer) {
      if (timer.timeRemaining <= 0) {
        return { timeRemaining: timer.timeRemaining, hours: 0, minutes: 0, seconds: 0 };
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

      return checkRemaining({ timeRemaining, hours, minutes, seconds });
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
});
