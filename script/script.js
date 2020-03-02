const card = document.getElementById('card'),
  mp4 = document.getElementById('mp4'),
  video = document.getElementById('video'),
  dog = document.getElementById('dog'),
  cat = document.getElementById('cat');


class Animal {
  constructor(src) {
    this.src = src;
    this.init();
    this.checkType();
  }
  
  checkType() {
    const pattern = /.mp4/i;

    let value = '',
      movie = '';

    if (pattern.test(this.src)) {
      movie = this.src;
      video.setAttribute('controls', '');
    } else {
      value = this.src;
      video.removeAttribute('controls');
    }
    
    mp4.src = movie;
    card.src = value;
    video.load();
  }
}

class Dog extends Animal {
  constructor({url}) {
    super(url);
  }
  
  init() {
    dog.src = this.src;
  }
}

class Cat extends Animal {
  constructor({file}) {
    super(file);
  }

  init() {
    cat.src = this.src;
  }
}

const classMap = {
  'Dog': Dog,
  'Cat': Cat
};

const getAnimal = (url, name) => {
  return fetch(url)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.statusText);
            }
          
            return response.json();
          })
          .then((data) => {
            new classMap[name](data);
          })
          .catch((error) => console.log(error));
};

dog.addEventListener('click', () => {
  getAnimal('https://random.dog/woof.json', 'Dog');
});

cat.addEventListener('click', () => {
  getAnimal('https://aws.random.cat/meow', 'Cat');
});