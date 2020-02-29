const button = document.getElementById('start'),
  reset = document.getElementById('reset'),
  total = document.querySelector('.total'),
  MAX = 100;

let interval = 0,
  toggle = false;

const animateTotal = () => {
  const value = +total.textContent;
  interval = requestAnimationFrame(animateTotal);

  if (value >= MAX) {
    cancelAnimationFrame(interval);
    return;
  }

  total.textContent = value + 1;
};

const toggleAnimate = () => {
  if (!toggle) {
    toggle = true;

    interval = requestAnimationFrame(animateTotal);
  } else {
    toggle = false;
    cancelAnimationFrame(interval);
  }
}

button.addEventListener('click', toggleAnimate);
reset.addEventListener('click', () => {
  cancelAnimationFrame(interval);
  total.textContent = 0;
  toggle = false;
});