/*import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('form input');
const textareaEl = document.querySelector('form textarea');
let formDate = {};
const STORAGE_KEY = 'feedback';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onFormSubmit(event) {
  event.preventDefault();

  if (inputEl.value === '' || textareaEl.value === '') {
    return alert('Fields must be filled in');
  }

  console.log(formDate);

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  formDate = {};
}

function onFormInput(event) {
  const formValue = event.target.value;
  const formKay = event.target.name;

  formDate[formKay] = formValue;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formDate));
}

function populateForm() {
  const savedForm = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedForm.email) {
    inputEl.value = savedForm.email;
    formDate.email = savedForm.email;
  }

  if (savedForm.message) {
    textareaEl.value = savedForm.message;
    formDate.message = savedForm.message;
  }
}

*/


import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const formEmail = document.querySelector('form input');
const formMessage = document.querySelector('form textarea');

populateForm();

let formData = {
  email: '',
  message: '',
};
form.addEventListener('input', throttle(onFormInput, 500));
function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({
      ...formData,
      email: formEmail.value,
      message: formMessage.value,
    })
  );
}

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();
  if (formEmail.value && formMessage.value) {
    form.reset();
    localStorage.removeItem('feedback-form-state');
    console.log(formData);
    formData.email = '';
    formData.message = '';
  } else {
    alert('Увага! Всі поля форми мають бути заповнені!');
  }
}

function populateForm() {
  const savedFormData = localStorage.getItem('feedback-form-state');

  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    formEmail.value = parsedFormData.email;
    formMessage.value = parsedFormData.message;
  } else {
    formEmail.value = '';
    formMessage.value = '';
  }
}