console.log('Client side js file');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  message1.textContent = 'Loading...';
  message2.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          message1.textContent = data.error;
        } else {
          message1.textContent = data.address;
          message2.textContent = data.forecast;
          console.log(data.forecast);
          console.log(data.address);
        }
      });
    }
  );
});
