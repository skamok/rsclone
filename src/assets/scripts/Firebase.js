import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import User from './User.js';

export default class Firebase {
  constructor(firebaseConfig, debug) {
    this.debug = debug;
    this.fireapp = firebase.initializeApp(firebaseConfig);
    Firebase.log('firebase.initializeApp');
    this.auth = this.fireapp.auth();
    this.database = this.fireapp.database();
    this.storage = this.fireapp.storage();
    this.storageRef = this.storage.ref();
    this.usersNode = this.database.ref('users');
  }

  signUP(email, password) {
    const retPromice = this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = new User(email);
        Firebase.log('firebase.signUP OK', user, userCredential.user);
        this.addUser(user);
      })
      .catch((error) => {
        const obj = {
          code: error.code,
          message: error.message
        };
        Firebase.log('firebase.signUP error', obj);
        return new Error(error.message);
      });
    return retPromice;
  }

  addUser(user) {
    const newUser = this.usersNode.push();
    Firebase.log('newUserID =', newUser.key);
    const retPromice = newUser.set(user);
    return retPromice;
  }

  static log(val, ...rest) {
    if (rest.length > 0) {
      // eslint-disable-next-line no-console
      console.log(val, ...rest);
    } else {
      // eslint-disable-next-line no-console
      console.log(val);
    }
  }
}
