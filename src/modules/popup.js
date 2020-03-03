const openPopup = () => {
  const popup = document.querySelector('.popup'),
    popupContent = document.querySelector('.popup-content'),
    serviceBlock = document.getElementById('service-block');

  const animatePopup = () => {
    const target = event.target;

    if (!target.matches('.popup-btn')) return;

    if (window.innerWidth > 768) {
      popupContent.style.transition = 'opacity .4s';
      popup.style.transition = 'opacity .4s';
      popupContent.style.opacity = 0;
      popup.style.opacity = 0;

      setTimeout(() => {
        popupContent.style.opacity = 1;
        popup.style.opacity = 1;
      }, 50);
    }

    popup.style.display = 'block';
  };

  const closePopup = () => {
    if (window.innerWidth > 768) {
      popupContent.style.opacity = 0;
      popup.style.opacity = 0;

      setTimeout(() => {
        popup.style.display = 'none';
      }, 400);
    } else {
      popup.style.display = 'none';
    }
  };

  serviceBlock.addEventListener('click', animatePopup);

  popup.addEventListener('click', event => {
    const target = event.target;

    if (target.matches('.popup-close') || !target.closest('.popup-content')) {
      closePopup();
    }
  });
};

export default openPopup;