'use strict';

let books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    adv = document.querySelector('.adv'),
    body = document.getElementsByTagName('body')[0];
    
body.removeChild(adv);
body.setAttribute('style', 'background-image: url(image/adv.jpg)');

books.insertBefore(book[1], book[0]);
books.insertBefore(book[2], null);
books.insertBefore(book[4], book[3]);

let link = book[4].getElementsByTagName('a')[0];

link.innerText = link.innerText.replace('Пропопипы', 'Прототипы');
    
book = document.querySelectorAll('.book');

let list = book[1].getElementsByTagName('ul')[0],
item = list.getElementsByTagName('li');

list.insertBefore(item[6], item[4]);
list.insertBefore(item[8], item[5]);
list.insertBefore(item[2], item[10]);

list = book[4].getElementsByTagName('ul')[0];
item = list.getElementsByTagName('li');

list.insertBefore(item[9], item[2]);
list.insertBefore(item[4], item[3]);
list.insertBefore(item[5], item[4]);
list.insertBefore(item[6], item[9]);

let newItem = document.createElement('li');
newItem.textContent = 'Глава 8: За пределами ES6';

list = book[5].getElementsByTagName('ul')[0];
item = list.getElementsByTagName('li');

list.insertBefore(newItem, item[9]);

console.log('book: ', book);
console.log('item: ', item);