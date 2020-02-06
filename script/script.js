'use strict';

let button = document.getElementsByTagName('button')[0],
    body = document.getElementsByTagName('body')[0],
    title = document.getElementsByTagName('h1')[0];

button.addEventListener('click', function() {
  let color = '#'+Math.floor(Math.random()*16777215).toString(16);

  title.textContent = color;
  body.style.background = color;
});