export default class SignInPage {
  constructor() {
    this.main = document.querySelector('main');
  }

  createSignInPage() {
    this.main.innerHTML = '';

    this.signInContainer = document.createElement('div');
    this.signInContainer.classList.add('authorization');

    this.signInForm = document.createElement('form');
    this.signInForm.classList.add('sign_in_form');
    this.signInContainer.appendChild(this.signInForm);

    this.usernameField = document.createElement('input');
    this.usernameField.classList.add('username_field', 'inputs');
    this.usernameField.setAttribute('type', 'text');
    this.usernameField.setAttribute('placeholder', 'Username');

    this.signInForm.appendChild(this.usernameField);

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

    this.main.appendChild(this.signInContainer);
  }
}
