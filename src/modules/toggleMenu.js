const toggleMenu = () => {
  const menu = document.querySelector('menu'),
    body = document.getElementsByTagName('body')[0];

  let transformFrame,
    transformValue = -100;

  function ValueCounter() {
    let counter = 0;
    const step = 4;

    return function () {
      counter += step;

      return counter;
    };
  }

  let transformCounter = new ValueCounter();

  const flowMenu = () => {
    transformFrame = requestAnimationFrame(flowMenu);

    if (transformValue === 0) {
      cancelAnimationFrame(transformFrame);
      return;
    }

    transformValue = -100 + transformCounter();
    menu.style.transform = `translate(${transformValue}%)`;
  };

  const checkAnimateCondition = () => {
    if (transformValue === -100) {
      return true;
    }

    return false;
  };

  const menuHandler = () => {
    if (checkAnimateCondition()) {
      transformCounter = new ValueCounter();
      transformValue = -100;

      transformFrame = requestAnimationFrame(flowMenu);
    }

    if (transformValue === 0) {
      menu.style.transform = 'translate(-100%)';
      transformValue = -100;
    }
  };

  const closeMenu = () => {
    if (transformValue === 0) {
      menu.style.transform = 'translate(-100%)';
      transformValue = -100;
    }
  };

  const clickMenu = event => {
    const target = event.target;

    if (target.matches('.close-btn, ul > li > a, .menu') || target.closest('.menu')) {
      menuHandler();
    } else if (!target.closest('menu')) {
      closeMenu();
    }
  };

  body.addEventListener('click', clickMenu);
};

export default toggleMenu;