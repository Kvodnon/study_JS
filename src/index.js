'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/timer';
import toggleMenu from './modules/toggleMenu';
import openPopup from './modules/popup';
import initMouseClick from './modules/mouseClick';
import tabs from './modules/tabs';
import slider from './modules/slider';
import team from './modules/team';
import calculator from './modules/calculator';
import sendForm from './modules/form';
import mask from './modules/plugins/maskPhone';
import validate from './modules/plugins/validate';

setInterval(countTimer, 1000, '21 february 2020');
toggleMenu();
openPopup();
initMouseClick();
tabs();
slider();
team();
calculator();
sendForm();
validate(mask);