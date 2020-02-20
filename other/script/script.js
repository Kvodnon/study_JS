'use strict';

(function() {
  //   Добрый день (утро, вечер, ночь в зависимости от времени суток)
  // Сегодня: Понедельник
  // Текущее время:12:05:15 PM
  // До нового года осталось 175 дней
  // ,
  const greetings = {
      'morning': 'Доброе утро',
      'evening': 'Добрый вечер',
      'night': 'Доброй ночи'
    },
    body = document.querySelector('body'),
    list = document.createElement('ul'),
    date = new Date(),
    hours = date.toLocaleString("ru", {
      hour: 'numeric'
    }),
    weekday = date.toLocaleString("ru", {
      weekday: 'long'
    });

  let greeting = 'Добрый день';

  function addZero(number) {
    number += '';

    if (number.length === 1) {
      number = '0' + number;
    }

    return number;
  }

  function daysLeftNewYear(now) {
    const ny = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);

    return 'До Нового года осталось ' + Math.floor((ny.getTime() - now.getTime()) / 86400000) + ' дней';
  }

  for (let counter = 0; counter < 4; counter++) {
    const item = document.createElement('li');
    list.appendChild(item);
  }

  if (hours === 23 || hours < 3) {
    greeting = greetings.night;
  }
  if (hours >= 3 && hours < 11) {
    greeting = greetings.morning;
  }
  if (hours >= 16 && hours < 23) {
    greeting = greetings.evening;
  }

  const items = list.children;

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    minutes = minutes < 10 ? '0' + minutes : minutes;

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)} ${ampm}`;
  }

  items[0].textContent = greeting;
  items[1].textContent = `Сегодня: ${weekday.charAt(0).toUpperCase() + weekday.substring(1)}`;
  items[2].textContent = `Текущее время: ${formatAMPM(date)}`;
  items[3].textContent = daysLeftNewYear(date);

  body.appendChild(list);
})();
