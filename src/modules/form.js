const sendForm = () => {
  const imgPath = './images/request/';

  const messages = {
    error: imgPath + 'error.jpg',
    load: imgPath + 'loading.jpg',
    success: imgPath + 'success.jpg'
  },
    form = document.getElementById('form1'),
    messageStatus = document.createElement('img');
  
  messageStatus.style.width = '300px';
  
  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    form.appendChild(messageStatus);
    messageStatus.src = messages.load;

    const formData = new FormData(form);

    let body = {};

    formData.forEach((value, key) => {
      body[key] = value;
    });

    postData(body).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      messageStatus.src = messages.success;
    }, (error) => {
      messageStatus.src = messages.error;
      console.log(error)
    });

    form.reset();
  });
};

export default sendForm;