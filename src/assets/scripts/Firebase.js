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
    const retPromice = this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // const user = new User(email);
        const user = {
          email,
          nick
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
    return retPromice;
  }

  addUser(uid, user) {
    const newUser = this.usersNode.child(uid);
    Firebase.log('firebase.addUser Info =', user);
    const retPromice = newUser.set(user)
      .then(() => {
        const obj = { email: 'ok' };
        return obj;
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.addUser error', obj);
        throw e;
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
        throw e;
      });
    return retPromice;
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
        const userLotsRef = this.usersNode.child(userID + '/lots');
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
    const retPromice = lotRef.set(newLot)
      .then(() => {
        const userLotsRef = this.usersNode.child(userID + '/lots');
        const retPromice = userLotsRef.once('value')
          .then((snapshot) => {
            let data = snapshot.val();
            if (data === null) {
              data = [lotId];
            } else {
              data.push(lotId);
            }
            userLotsRef.set(data);
            Firebase.log('firebase.addLot user lots', data);
          });
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.addLot error', obj);
        throw e;
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
}
