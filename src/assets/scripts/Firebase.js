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

  signUP(email, password, nick) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // const user = new User(email);
        const user = {
          email,
          nick,
          karmaCount: 3
        };
        Firebase.log('firebase.signUP OK', userCredential.user.uid);
        const id = userCredential.user.uid;
        return this.addUser(id, user);
      })
      .catch((error) => {
        const obj = {
          code: error.code,
          message: error.message
        };
        Firebase.log('firebase.signUP error', obj);
        throw error;
      });
  }

  addUser(uid, user) {
    const newUser = this.usersNode.child(uid);
    Firebase.log('firebase.addUser Info =', user);
    return newUser.set(user)
      .then(() => {
        const obj = { email: 'ok' };
        return Promise.resolve(obj);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.addUser error', obj);
        throw e;
      });
  }

  signIN(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        Firebase.log('firebase.signIN OK', userCredential.user.email, userCredential.user.uid);
        return Promise.resolve(userCredential);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.signIN error', obj);
        throw e;
      });
  }

  signOUT() {
    this.auth.signOut();
  }

  addLotSinglePic(lot) {
    const imgsArray = [];
    const userID = this.auth.currentUser.uid;
    const lotId = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotId);
    const imgRef = lotStorageRef.child(lot.imgFiles[0].name);
    return imgRef.put(lot.imgFiles[0])
      .then((snapshot) => {
        Firebase.log('firebase.addLotSinglePic image loaded ');
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        imgsArray.push(downloadURL);
        const newLot = {
          userID,
          title: lot.title,
          description: lot.description,
          dtCreate: (new Date()).toJSON(),
          imgURLs: imgsArray
        };
        const lotRef = this.lotsNode.child(lotId);
        Firebase.log('firebase.addLotSinglePic lot =', lotId, newLot);
        return lotRef.set(newLot);
      })
      .then(() => {
        const userLotsRef = this.usersNode.child(`${userID}/lots`);
        return userLotsRef.once('value');
      })
      .then((dataSnapshot) => {
        let userLotsArray = dataSnapshot.val();
        if (userLotsArray === null) {
          userLotsArray = [lotId];
        } else {
          userLotsArray.push(lotId);
        }
        Firebase.log('firebase.addLotSinglePic userLots =', userLotsArray);
        return dataSnapshot.ref.set(userLotsArray);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.addLotSinglePic error', obj);
        throw e;
      });
  }

  addLotMultiPic(lot) {
    const userID = this.auth.currentUser.uid;
    const lotId = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotId);
    return Firebase.loadFiles(lotStorageRef, lot.imgFiles)
      .then((imgURLsArray) => {
        const newLot = {
          userID,
          title: lot.title,
          description: lot.description,
          dtCreate: (new Date()).toJSON(),
          imgURLs: imgURLsArray
        };
        const lotRef = this.lotsNode.child(lotId);
        Firebase.log('firebase.addLotMultiPic lot =', lotId, newLot);
        return lotRef.set(newLot);
      })
      .then(() => {
        const userLotsRef = this.usersNode.child(`${userID}/lots`);
        return userLotsRef.once('value');
      })
      .then((dataSnapshot) => {
        let userLotsArray = dataSnapshot.val();
        if (userLotsArray === null) {
          userLotsArray = [lotId];
        } else {
          userLotsArray.push(lotId);
        }
        Firebase.log('firebase.LotMultiPic userLots =', userLotsArray);
        return dataSnapshot.ref.set(userLotsArray);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.LotMultiPic error', obj);
        throw e;
      });
  }

  readLots() {
    const retPromise = this.lotsNode.once('value').then((snapshot) => {
      const data = snapshot.val();
      Firebase.log('firebase.readLots', data);
      return data;
    });
    return retPromise;
  }

  readUsers() {
    return this.usersNode.once('value')
      .then((dataSnapshot) => {
        const users = dataSnapshot.val();
        return Promise.resolve(users);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.readUsers error', obj);
        throw e;
      });
  }

  readCurrentUser() {
    const userID = this.auth.currentUser.uid;
    const refUser = this.usersNode.child(userID);
    return refUser.once('value')
      .then((dataSnapshot) => {
        const user = dataSnapshot.val();
        return Promise.resolve(user);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.readUsers error', obj);
        throw e;
      });
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

  static async loadFiles(lotStorageRef, files) {
    const imgURLs = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const imgRef = lotStorageRef.child(file.name);
      // eslint-disable-next-line no-await-in-loop
      await imgRef.put(file)
        .then((uploadTaskSnapshot) => uploadTaskSnapshot.ref.getDownloadURL())
        .then((downloadURL) => {
          imgURLs.push(downloadURL);
          Firebase.log('firebase.loadFiles downloadURL = ', downloadURL);
        });
    }
    return imgURLs;
  }
}
