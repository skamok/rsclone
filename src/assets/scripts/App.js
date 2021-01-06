import Firebase from './Firebase.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB1IcbVVCqWFMAOoFpt8K19T63RsKTXHoI',
  authDomain: 'gratisclonewars.firebaseapp.com',
  databaseURL: 'https://gratisclonewars-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'gratisclonewars',
  storageBucket: 'gratisclonewars.appspot.com',
  messagingSenderId: '1085006089053',
  appId: '1:1085006089053:web:c2224f43e082b9475736b4'
};

const formSignUp = {
  form: document.getElementById('formsignup')
};
formSignUp.EEMail = formSignUp.form.querySelector('#email');
formSignUp.EPassword = formSignUp.form.querySelector('#password');
formSignUp.BtnSignUp = formSignUp.form.querySelector('#btnsignup');

export default class App {
  constructor() {
    this.firebase = new Firebase(firebaseConfig, true);
    this.formSignUp = formSignUp;
  }

  init() {
    this.formSignUp.form.addEventListener('submit', this.signUp);
  }

  signUp = (event) => {
    event.preventDefault();
    this.firebase.signUP(this.formSignUp.EEMail.value, this.formSignUp.EPassword.value);
  }
}
