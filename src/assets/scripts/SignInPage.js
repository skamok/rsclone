import MainPage from './MainPage.js';
// eslint-disable-next-line import/no-cycle
import RegistrationPage from './RegistrationPage.js';

export default class SignInPage {
  constructor(firebase, mainSection, headerSection, logo) {
    this.main = mainSection;
    this.header = headerSection;
    this.logo = logo;
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

    this.linkRegistration = document.createElement('span');
    this.linkRegistration.classList.add('link_registration');
    this.linkRegistration.innerText = 'For registration click here';
    this.signInForm.appendChild(this.linkRegistration);
    this.linkRegistration.addEventListener('click', this.goToRegistration.bind(this));

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
        const mainPage = new MainPage(this.firebase, this.main, this.header, this.logo);
        mainPage.createMainPage();
      })
      .catch((e) => {
        this.errorField.innerText = `${e.message}`;
        this.errorField.classList.remove('zero_opacity');
      });
  }

  goToRegistration() {
    const registrationPage = new RegistrationPage(this.firebase, this.main, this.header, this.logo);
    registrationPage.createRegistrationPage();
  }
}
