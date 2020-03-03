const initMouseClick = () => {
  const mouse = document.querySelector('a[href="#service-block"]'),
    serviceBlock = document.getElementById('service-block'),
    scrollStep = 40,
    menu = document.querySelector('menu'),
    menuItems = menu.querySelectorAll('ul > li > a');

  let frameId;


  function translateScroll(offsetTop) {
    frameId = requestAnimationFrame(translateScroll.bind(this, offsetTop));

    const difference = offsetTop - ((offsetTop % window.scrollY) % scrollStep),
      scrollBottom = window.document.documentElement.offsetHeight - window.document.documentElement.clientHeight;

    if (window.scrollY === difference || window.scrollY === scrollBottom) {
      cancelAnimationFrame(frameId);
      document.documentElement.scrollTop = offsetTop;
      return;
    }

    document.documentElement.scrollTop += scrollStep;
  }

  function toSecondScreen(event, block) {
    event.preventDefault();
    frameId = requestAnimationFrame(translateScroll.bind(this, block.offsetTop));
  }

  mouse.addEventListener('click', event => {
    toSecondScreen(event, serviceBlock);
  });

  for (const item of menuItems) {
    item.addEventListener('click', function (event) {
      toSecondScreen(event, document.querySelector(this.getAttribute('href')));
    });
  }
};

export default initMouseClick;