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
  if (this.selector) {
    if (this.selector.indexOf('.', 0) === 0) {
      let element = document.createElement('div');
      element.classList.add(this.selector.slice('1', this.selector.length));
      body.append(element);
      this.element = element;
    }
    
    if (this.selector.indexOf('#', 0) === 0) {
      let element = document.createElement('div');
      element.id = this.selector.slice('1', this.selector.length);
      body.append(element);
      this.element = element;
    }
  }
};

DomElement.prototype.insertText = function(text) {
  
};

let square = new DomElement('.#lesson');
square.create();