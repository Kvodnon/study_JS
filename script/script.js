document.addEventListener("DOMContentLoaded", function() {
  'use strict';

  const body = document.querySelector('body');
  
  const DomElement = function(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
  };
  
  DomElement.prototype.create = function() {
    let element = document.createElement('div');
  
    if (this.selector) {
      if (this.selector.indexOf('.', 0) === 0) {
        element.classList.add(this.selector.slice('1', this.selector.length));
      }
      
      if (this.selector.indexOf('#', 0) === 0) {
        element.id = this.selector.slice('1', this.selector.length);
      }
    }
  
    element.style.height = this.height;
    element.style.width = this.width;
    element.style.background = this.bg;
    element.style.fontSize = this.fontSize;
  
    body.append(element);
    this.element = element;
  };
  
  DomElement.prototype.insertText = function(text) {
    this.element.innerText = text;
  };
  
  let square = new DomElement('.square', '100px', '100px', 'yellow');
  square.create();
  square.insertText('test');
  square.element.style.position = 'absolute';

  const keyCodes = [37,38,39,40],
    codes = {
      37: {
        position: -10,
        positionName: 'left'
      },
      38: {
        position: -10,
        positionName: 'top'
      },
      39: {
        position: 10,
        positionName: 'left'
      },
      40: {
        position: 10,
        positionName: 'top'
      },
    };

  document.addEventListener("keydown", function(event) {
    if (keyCodes.indexOf(event.keyCode) >= 0) {
      let position = 0;

      if (square.element.style[codes[event.keyCode].positionName]) {
        position = parseInt(square.element.style[codes[event.keyCode].positionName]);
      }

      position += codes[event.keyCode].position;

      square.element.style[codes[event.keyCode].positionName] = position + 'px';
    }
  });
});
