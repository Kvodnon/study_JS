'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const timerHours = document.getElementById('timer-hours'),
    timerMinutes = document.getElementById('timer-minutes'),
    timerSeconds = document.getElementById('timer-seconds');

  function countTimer(deadline) {
    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);

      return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
      const timer = getTimeRemaining();
  
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      // if (timer.timeRemaining > 0) {
      //   setTimeout(updateClock, 1000);
      // }
    }

    updateClock();
  }

  // countTimer('23 february 2020');
  setInterval(countTimer, 1000, '23 february 2020');
});