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
const formSignIn = {
  form: document.getElementById('formsignin')
};
formSignIn.EEMail = formSignIn.form.querySelector('#signinemail');
formSignIn.EPassword = formSignIn.form.querySelector('#signinpassword');
formSignIn.BtnSignIn = formSignIn.form.querySelector('#btnsignin');
formSignIn.BtnSignOut = formSignIn.form.querySelector('#btnsignout');

const formAddLot = {
  form: document.getElementById('formaddlot')
};
formAddLot.EDecsription = formAddLot.form.querySelector('#decsription');
formAddLot.btnUploadFiles = formAddLot.form.querySelector('#btnuploadfiles');
formAddLot.ETitle = formAddLot.form.querySelector('#title');
formAddLot.img0 = formAddLot.form.querySelector('#img0');
formAddLot.img1 = formAddLot.form.querySelector('#img1');
formAddLot.btnAddLot = formAddLot.form.querySelector('#btnaddlot');

const formReadLot = {
  form: document.getElementById('formreadlot')
};
formReadLot.EDecsription = formReadLot.form.querySelector('#lotdecsription');
formReadLot.ETitle = formReadLot.form.querySelector('#lottitle');
formReadLot.img0 = formReadLot.form.querySelector('#lotimg0');
formReadLot.img1 = formReadLot.form.querySelector('#lotimg1');
formReadLot.btnReadLot = formReadLot.form.querySelector('#btnreadlot');

export default class App {
  constructor() {
    this.firebase = new Firebase(firebaseConfig, true);
    this.formSignUp = formSignUp;
    this.formSignIn = formSignIn;
    this.formAddLot = formAddLot;
    this.formReadLot = formReadLot;
  }

  init() {
    this.formSignUp.form.addEventListener('submit', this.signUp);
    this.formSignIn.form.addEventListener('submit', this.signIn);
    this.formSignIn.form.addEventListener('reset', this.signOut);
    this.formAddLot.btnAddLot.addEventListener('click', this.addLot);
    this.formReadLot.btnReadLot.addEventListener('click', this.readLot);
  }

  signUp = (event) => {
    event.preventDefault();
    this.firebase.signUP(this.formSignUp.EEMail.value, this.formSignUp.EPassword.value);
  }

  signIn = (event) => {
    event.preventDefault();
    this.firebase.signIN(this.formSignIn.EEMail.value, this.formSignIn.EPassword.value);
  }

  signOut = (event) => {
    event.preventDefault();
    this.firebase.signOUT();
  }

  addLot = () => {
    this.formAddLot.img0.src = URL.createObjectURL(this.formAddLot.btnUploadFiles.files[0]);
    this.formAddLot.img1.src = URL.createObjectURL(this.formAddLot.btnUploadFiles.files[1]);
    const lot = {
      title: this.formAddLot.ETitle.value,
      description: this.formAddLot.EDecsription.value,
      imgFiles: this.formAddLot.btnUploadFiles.files
    };
    this.firebase.addLot(lot);
  }

  readLot = (event) => {
    event.preventDefault();
    this.firebase.readLots()
      .then((lots) => {
        const lotsArray = Object.entries(lots);
        
      });
  }
}
