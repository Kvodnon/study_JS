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

  let deadline = '21 february 2020';

  function countTimer() {
    function checkRemaining(dateStop) {
      const dateNow = new Date().getTime();
      let timeRemaining = (dateStop - dateNow) / 1000;

      if (timeRemaining <= 0) {
        var tomorrow = new Date();
        deadline = new Date(tomorrow.setDate(tomorrow.getDate() + 1));

        dateStop = new Date(deadline).getTime();

        timeRemaining = (dateStop - dateNow) / 1000;
      }

      return timeRemaining;
    }

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        timeRemaining = checkRemaining(dateStop),
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      return {timeRemaining, hours, minutes, seconds};
    }


    function updateClock() {
      const timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);
    }

    updateClock();
  }

  setInterval(countTimer, 1000);
});
