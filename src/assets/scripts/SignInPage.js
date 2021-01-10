import MainPage from './MainPage.js';
import MainPageLots from './MainPageLots.js';

export default class SignInPage {
  constructor(firebase) {
    this.main = document.querySelector('main');
    this.firebase = firebase;
  }

  createSignInPage() {
    this.main.innerHTML = '';

    this.signInContainer = document.createElement('div');
    this.signInContainer.classList.add('authorization');

    this.signInForm = document.createElement('form');
    this.signInForm.classList.add('sign_in_form');
    this.signInContainer.appendChild(this.signInForm);

    this.emailField = document.createElement('input');
    this.emailField.classList.add('email_field', 'inputs');
    this.emailField.setAttribute('type', 'email');
    this.emailField.setAttribute('placeholder', 'Email');

    this.signInForm.appendChild(this.emailField);

    this.passwordField = document.createElement('input');
    this.passwordField.classList.add('username_field', 'inputs');
    this.passwordField.setAttribute('type', 'password');
    this.passwordField.setAttribute('placeholder', 'Password');

    this.signInForm.appendChild(this.passwordField);

    this.buttonSubmit = document.createElement('button');
    this.buttonSubmit.classList.add('submit_button');
    this.buttonSubmit.setAttribute('type', 'submit');
    this.buttonSubmit.innerText = 'Submit';
    this.signInForm.appendChild(this.buttonSubmit);
    this.buttonSubmit.addEventListener('click', this.signIn);

    this.errorField = document.createElement('div');
    this.errorField.classList.add('signIn_error', 'zero_opacity');
    this.errorField.innerText = 'No errors';
    this.signInForm.appendChild(this.errorField);

    this.main.appendChild(this.signInContainer);

    this.signInForm.addEventListener('submit', this.signIn);
  }

  signIn = (event) => {
    event.preventDefault();
    this.firebase.signIN(this.emailField.value, this.passwordField.value)
      .then(() => {
        const mainPage = new MainPage(this.firebase);
        mainPage.createMainPage();
        const mainPageLots = new MainPageLots(this.firebase);
        mainPageLots.createMainPageLots();
      })
      .catch((e) => {
        this.errorField.innerText = `${e.message}`;
        this.errorField.classList.remove('zero_opacity');
      });
  }
}
