const calculator = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

  const replaceToNumber = () => {
    const target = event.target;
    
    if (!target.matches('input'));

    target.value = target.value.replace(/[^\d]/, '');
  };

  calcBlock.addEventListener('input', replaceToNumber);

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1,
      tempTotal = 0,
      interval;

    const typeValue = calcType.options[calcType.selectedIndex].value,
      squareValue = +calcSquare.value;

    if (calcCount.value > 1) {
      countValue += (+calcCount.value - 1) / 10;
    }

    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }

    const animateTotal = () => {
      interval = requestAnimationFrame(animateTotal);

      tempTotal += 4;

      if (tempTotal >= total) {
        totalValue.textContent = parseInt(total);
        cancelAnimationFrame(interval);
        return;
      }

      totalValue.textContent = tempTotal;
    };

    interval = requestAnimationFrame(animateTotal);
  };

  calcBlock.addEventListener('change', () => {
    const target = event.target;

    if (!target.matches('select, input')) return;

    countSum();
  });
};

export default calculator;