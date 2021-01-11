import SignInPage from './SignInPage.js';
import RegistrationPage from './RegistrationPage.js';

export default class AuthorizationPage {
  constructor(firebase, header, main, logo) {
    this.header = header;
    this.main = main;
    this.logo = logo;
    this.firebase = firebase;
  }

  createAuthorizationPage() {
    this.authorizationContainer = document.createElement('div');
    this.authorizationContainer.classList.add('authorization');

    this.signInBlock = document.createElement('div');
    this.signInBlock.classList.add('sign-in-block');

    this.signInHint = document.createElement('div');
    this.signInHint.classList.add('sign-in-hint', 'hints');
    this.signInHint.innerText = 'If you already registered';

    this.buttonSignIn = document.createElement('button');
    this.buttonSignIn.classList.add('sign-in-button', 'authorization-buttons');
    this.buttonSignIn.innerText = 'Sign in';
    this.buttonSignIn.addEventListener('click', () => {
      const signInPage = new SignInPage(this.firebase, this.main, this.header, this.logo);
      signInPage.createSignInPage();
    });

    this.signInBlock.appendChild(this.signInHint);
    this.signInBlock.appendChild(this.buttonSignIn);

    this.registrationBlock = document.createElement('div');
    this.registrationBlock.classList.add('registration-block');

    this.registrationHint = document.createElement('div');
    this.registrationHint.classList.add('registration-hint', 'hints');
    this.registrationHint.innerText = 'New here?';

    this.buttonRegistration = document.createElement('button');
    this.buttonRegistration.classList.add('registration-button', 'authorization-buttons');
    this.buttonRegistration.innerText = 'Registration';
    this.buttonRegistration.addEventListener('click', () => {
      const registrationPage = new RegistrationPage(this.firebase);
      registrationPage.createRegistrationPage();
    });

    this.registrationBlock.appendChild(this.registrationHint);
    this.registrationBlock.appendChild(this.buttonRegistration);

    this.authorizationContainer.appendChild(this.signInBlock);
    this.authorizationContainer.appendChild(this.registrationBlock);
    this.main.appendChild(this.authorizationContainer);
  }
}
