// eslint-disable-next-line import/no-cycle
import SignInPage from './SignInPage.js';

export default class RegistrationPage {
  constructor(firebase, mainSection, headerSection, logo) {
    this.main = mainSection;
    this.firebase = firebase;
    this.header = headerSection;
    this.logo = logo;
  }

  createRegistrationPage() {
    this.main.innerHTML = '';

    this.registrationContainer = document.createElement('div');
    this.registrationContainer.classList.add('authorization');

    this.registrationForm = document.createElement('form');
    this.registrationForm.classList.add('sign_in_form');
    this.registrationContainer.appendChild(this.registrationForm);

    this.emailField = document.createElement('input');
    this.emailField.classList.add('email_field', 'inputs');
    this.emailField.setAttribute('type', 'email');
    this.emailField.setAttribute('placeholder', 'Email');

    this.registrationForm.appendChild(this.emailField);

    this.usernameField = document.createElement('input');
    this.usernameField.classList.add('username_field', 'inputs');
    this.usernameField.setAttribute('type', 'text');
    this.usernameField.setAttribute('placeholder', 'Username');

    this.registrationForm.appendChild(this.usernameField);

    this.passwordField = document.createElement('input');
    this.passwordField.classList.add('password_field', 'inputs');
    this.passwordField.setAttribute('type', 'password');
    this.passwordField.setAttribute('placeholder', 'Password');

    this.registrationForm.appendChild(this.passwordField);

    this.repeatPasswordField = document.createElement('input');
    this.repeatPasswordField.classList.add('repeat_password_field', 'inputs');
    this.repeatPasswordField.setAttribute('type', 'password');
    this.repeatPasswordField.setAttribute('placeholder', 'Repeat password');

    this.registrationForm.appendChild(this.repeatPasswordField);

    this.buttonSubmit = document.createElement('button');
    this.buttonSubmit.classList.add('submit_button');
    this.buttonSubmit.setAttribute('type', 'submit');
    this.buttonSubmit.innerText = 'Submit';
    this.registrationForm.appendChild(this.buttonSubmit);

    this.linkSignIn = document.createElement('span');
    this.linkSignIn.classList.add('link_registration');
    this.linkSignIn.innerText = 'For signIn click here';
    this.registrationForm.appendChild(this.linkSignIn);
    this.linkSignIn.addEventListener('click', this.goToSignIn.bind(this));

    this.main.appendChild(this.registrationContainer);

    this.registrationForm.addEventListener('submit', this.signUp);
  }

  signUp = (event) => {
    event.preventDefault();
    this.firebase.signUP(this.emailField.value, this.passwordField.value, this.usernameField.value)
      .then((obj) => {
        alert(obj.email);
      })
      .catch((e) => alert(e));
  }

  goToSignIn() {
    const signInPage = new SignInPage(this.firebase, this.main, this.header, this.logo);
    signInPage.createSignInPage();
  }
}
