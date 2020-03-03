const tabs = () => {
  const tabHeader = document.querySelector('.service-header'),
    tabs = document.querySelectorAll('.service-header-tab'),
    tabsContent = document.querySelectorAll('.service-tab');

  const toogleContent = index => {
    for (const content in [...tabsContent]) {
      if (content === index) {
        tabs[content].classList.add('active');
        tabsContent[content].classList.remove('d-none');
      } else {
        tabs[content].classList.remove('active');
        tabsContent[content].classList.add('d-none');
      }
    }
  };

  tabHeader.addEventListener('click', () => {
    let target = event.target;

    target = target.closest('.service-header-tab');

    if (target) {
      for (const tab in [...tabs]) {
        if (tabs[tab] === target) {
          toogleContent(tab);
        }
      }
    }

  });
};

export default tabs;