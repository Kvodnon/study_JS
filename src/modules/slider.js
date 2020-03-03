const slider = () => {
  const slides = document.querySelectorAll('.portfolio-item'),
    slider = document.querySelector('.portfolio-content');

  let currentSlide = 0,
    interval;

  const prevSlide = (elem, index, selector) => {
    elem[index].classList.remove(selector);
  };

  const nextSlide = (elem, index, selector) => {
    elem[index].classList.add(selector);
  };

  const createDots = () => {
    const dots = document.createElement('ul'),
      list = [];
    dots.classList.add('portfolio-dots');

    slides.forEach(() => {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      list.push(dot);
      dots.appendChild(dot);
    });

    slider.appendChild(dots);

    return list;
  };

  const dots = createDots();
  nextSlide(dots, currentSlide, 'dot-active');

  const autoPlay = () => {
    prevSlide(slides, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');
    currentSlide++;
    if (currentSlide === slides.length) {
      currentSlide = 0;
    }
    nextSlide(slides, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  };

  const startSlider = (time = 3000) => {
    interval = setInterval(autoPlay, time);
  };

  const stopSlider = () => {
    clearInterval(interval);
  };

  slider.addEventListener('click', event => {
    event.preventDefault();

    const target = event.target;

    if (!target.matches('.portfolio-btn, .dot')) {
      return;
    }

    prevSlide(slides, currentSlide, 'portfolio-item-active');
    prevSlide(dots, currentSlide, 'dot-active');

    if (target.matches('#arrow-right')) {
      currentSlide++;
    }

    if (target.matches('#arrow-left')) {
      currentSlide--;
    }

    if (target.matches('.dot')) {
      dots.forEach((dot, index) => {
        if (dot === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    nextSlide(slides, currentSlide, 'portfolio-item-active');
    nextSlide(dots, currentSlide, 'dot-active');
  });


  slider.addEventListener('mouseover', event => {
    if (event.target.matches('.portfolio-btn, .dot')) {
      stopSlider();
    }
  });

  slider.addEventListener('mouseout', event => {
    if (event.target.matches('.portfolio-btn, .dot')) {
      startSlider();
    }
  });



  startSlider(1500);
};

export default slider;