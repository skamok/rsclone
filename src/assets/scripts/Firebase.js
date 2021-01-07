import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import User from './User.js';

export default class Firebase {
  constructor(firebaseConfig, debug) {
    this.debug = debug;
    this.fireapp = firebase.initializeApp(firebaseConfig);
    Firebase.log('firebase.initializeApp');
    this.auth = this.fireapp.auth();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        Firebase.log('firebase.onAuthStateChanged User is signed IN', user.email, user.uid);
      } else {
        Firebase.log('firebase.onAuthStateChanged User is signed out');
      }
    });
    this.database = this.fireapp.database();
    this.storage = this.fireapp.storage();
    this.storageRef = this.storage.ref();
    this.storageLotsRef = this.storageRef.child('lots');
    this.usersNode = this.database.ref('users');
    this.lotsNode = this.database.ref('lots');
  }

  signUP(email, password) {
    const retPromice = this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // const user = new User(email);
        const user = {
          email
        };
        Firebase.log('firebase.signUP OK', userCredential.user.uid);
        const id = userCredential.user.uid;
        this.addUser(id, user);
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

  signIN(email, password) {
    const retPromice = this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        Firebase.log('firebase.signIN OK', userCredential.user.email, userCredential.user.uid);
        return userCredential;
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.signIN error', obj);
        return new Error(e.message);
      });
    return retPromice;
  }

  signOUT() {
    this.auth.signOut();
  }

  addUser(uid, user) {
    const newUser = this.usersNode.child(uid);
    Firebase.log('firebase.newUserID =', newUser);
    const retPromice = newUser.set(user).catch((e) => {
      const obj = {
        code: e.code,
        message: e.message
      };
      Firebase.log('firebase.addUser error', obj);
      return new Error(e.message);
    });
    return retPromice;
  }

  addLot(lot) {
    const imgsArray = [];
    const userID = this.auth.currentUser.uid;
    const lotId = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotId);
    for (let index = 0; index < lot.imgFiles.length; index++) {
      const imgRef = lotStorageRef.child(lot.imgFiles[index].name);
      imgsArray.push(imgRef.fullPath);
      imgRef.put(lot.imgFiles[index]);
    }
    const newLot = {
      userID,
      title: lot.title,
      description: lot.description,
      dtCreate: (new Date()).toJSON(),
      imgURLs: imgsArray
    };
    Firebase.log('firebase.addLot lot =', lotId, newLot);
    const lotRef = this.lotsNode.child(lotId);
    const retPromice = lotRef.set(newLot).catch((e) => {
      const obj = {
        code: e.code,
        message: e.message
      };
      Firebase.log('firebase.addLot error', obj);
      return new Error(e.message);
    });
    return retPromice;
  }

  readLots() {
    const retPromise = this.lotsNode.once('value').then((snapshot) => {
      const data = snapshot.val();
      Firebase.log('firebase.readLots', data);
      return data;
    });
    return retPromise;
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
