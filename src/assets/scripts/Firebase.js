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
    this.chatsNode = this.database.ref('chats');
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
    const lotID = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotID);
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
          lotID,
          title: lot.title,
          description: lot.description,
          dtCreate: (new Date()).toJSON(),
          imgURLs: imgsArray
        };
        const lotRef = this.lotsNode.child(lotID);
        Firebase.log('firebase.addLotSinglePic lot =', lotID, newLot);
        return lotRef.set(newLot);
      })
      .then(() => {
        const userLotsRef = this.usersNode.child(`${userID}/lots`);
        return userLotsRef.once('value');
      })
      .then((dataSnapshot) => {
        let userLotsArray = dataSnapshot.val();
        if (userLotsArray === null) {
          userLotsArray = [lotID];
        } else {
          userLotsArray.push(lotID);
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
    // const userID = this.auth.currentUser.uid;
    const lotID = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotID);
    return Firebase.loadFiles(lotStorageRef, lot.imgFiles)
      .then((imgURLsArray) => {
        const newLot1 = {
          lotID,
          imgURLs: imgURLsArray
        };
        const newLot = Object.assign(newLot1, lot);
        const lotRef = this.lotsNode.child(lotID);
        Firebase.log('firebase.addLotMultiPic lot =', lotID, newLot);
        return lotRef.set(newLot);
      })
      .then(() => {
        const userLotsRef = this.usersNode.child(`${lot.userID}/lots`);
        return userLotsRef.once('value');
      })
      .then((dataSnapshot) => {
        let userLotsArray = dataSnapshot.val();
        if (userLotsArray === null) {
          userLotsArray = [lotID];
        } else {
          userLotsArray.push(lotID);
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

  addLotMultiPicURL(lot) {
    // const userID = this.auth.currentUser.uid;
    const lotID = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotID);
    return Firebase.loadFilesURL(lotStorageRef, lot.imgFiles)
      .then((imgURLsArray) => {
        const newLot1 = {
          lotID,
          imgURLs: imgURLsArray
        };
        const newLot = Object.assign(newLot1, lot);
        const lotRef = this.lotsNode.child(lotID);
        Firebase.log('firebase.addLotMultiPic lot =', lotID, newLot);
        return lotRef.set(newLot);
      })
      .then(() => {
        const userLotsRef = this.usersNode.child(`${lot.userID}/lots`);
        return userLotsRef.once('value');
      })
      .then((dataSnapshot) => {
        let userLotsArray = dataSnapshot.val();
        if (userLotsArray === null) {
          userLotsArray = [lotID];
        } else {
          userLotsArray.push(lotID);
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

  toggleWishLots(lotInfo) {
    const lot = lotInfo.lotID;
    const currentUserID = this.auth.currentUser.uid;
    if (currentUserID === lotInfo.userID) {
      return Promise.reject(new Error('Error. It is your lot'));
    }
    const refUserWishLots = this.usersNode.child(`${currentUserID}/wishLots`);
    let ret;
    return refUserWishLots.once('value')
      .then((dataSnapshot) => {
        const lotsArray = dataSnapshot.val();
        if (lotsArray === null) {
          const newArray = [lot];
          ret = `add ${lot}`;
          return refUserWishLots.set(newArray);
        }
        const pos = lotsArray.indexOf(lot);
        if (pos === -1) {
          lotsArray.push(lot);
          ret = `add ${lot}`;
        } else {
          lotsArray.splice(pos, 1);
          ret = `delete ${lot}`;
        }
        return refUserWishLots.set(lotsArray);
      })
      .then(() => {
        Firebase.log('firebase.toggleWish ', ret);
        return Promise.resolve(ret);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.toggleWish error', obj);
        throw e;
      });
  }

  addMessageFromLot(lotID, lotOwner, message) {
    const currentUserID = this.auth.currentUser.uid;
    if (currentUserID === lotOwner) {
      return Promise.reject(new Error('Yoy can not write to myself'));
    }
    let chatID;
    let chatRef;
    let messagesRef;
    let messageID;
    const userFirstChatsRef = this.usersNode.child(currentUserID).child('chats');
    const userSecondChatsRef = this.usersNode.child(lotOwner).child('chats');
    const chatsUserFirst = [];
    const chatsUserSecond = [];
    // check if chat exist
    return this.chatsNode.orderByChild('lotID').equalTo(lotID).once('value')
      .then((lotsTable) => {
        const chatsArray = Object.values(lotsTable.val());
        const exist = chatsArray.find((chat) => chat.userFirst === currentUserID);
        if (exist === undefined) {
          Firebase.log('firebase.addMessageFromLot need new chat');
          chatID = this.chatsNode.push().key;
          chatRef = this.chatsNode.child(chatID);
          const chatObj = {
            chatID,
            lotID,
            userFirst: currentUserID,
            userSecond: lotOwner
          };
          return chatRef.set(chatObj)
            .then(() => {
              messagesRef = chatRef.child('messages');
              messageID = messagesRef.push().key;
              const messageObj = {
                messageID,
                message,
                userID: currentUserID,
                dtCreate: (new Date()).toJSON()
              };
              return messagesRef.child(messageID).set(messageObj);
            })
            .then(() => userFirstChatsRef.once('value'))
            .then((dataSnapshot) => {
              if (dataSnapshot.val() === null) {
                chatsUserFirst.push(chatID);
              } else {
                Array.prototype.push.apply(chatsUserFirst, dataSnapshot.val());
                chatsUserFirst.push(chatID);
              }
              return userSecondChatsRef.once('value');
            })
            .then((dataSnapshot) => {
              if (dataSnapshot.val() === null) {
                chatsUserSecond.push(chatID);
              } else {
                Array.prototype.push.apply(chatsUserSecond, dataSnapshot.val());
                chatsUserSecond.push(chatID);
              }
              const updates = {};
              updates[`/users/${currentUserID}/chats`] = chatsUserFirst;
              updates[`/users/${lotOwner}/chats`] = chatsUserSecond;
              this.database.ref().update(updates);
            })
            .then(() => {
              Firebase.log('firebase.addMessageFromLot new chatID = ', chatID);
              return Promise.resolve(chatID);
            });
        }
        Firebase.log('firebase.addMessageFromLot chat exist');
        chatID = exist.chatID;
        chatRef = this.chatsNode.child(chatID);
        messagesRef = chatRef.child('messages');
        messageID = messagesRef.push().key;
        const messageObj = {
          messageID,
          message,
          userID: currentUserID,
          dtCreate: (new Date()).toJSON()
        };
        Firebase.log('firebase.addMessageFromLot new messageID = ', messageID);
        return messagesRef.child(messageID).set(messageObj);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.addMessageFromLot error', obj);
        throw e;
      });
    /*
    return chatRef.set(chatObj)
      .then(() => {
        const messageObj = {
          messageID,
          message,
          userID: currentUserID,
          dtCreate: (new Date()).toJSON()
        };
        return messagesRef.child(messageID).set(messageObj);
      })
      .then(() => userFirstChatsRef.once('value'))
      .then((dataSnapshot) => {
        if (dataSnapshot.val() === null) {
          chatsUserFirst.push(chatID);
        } else {
          Array.prototype.push.apply(chatsUserFirst, dataSnapshot.val());
          chatsUserFirst.push(chatID);
        }
        return userSecondChatsRef.once('value');
      })
      .then((dataSnapshot) => {
        if (dataSnapshot.val() === null) {
          chatsUserSecond.push(chatID);
        } else {
          Array.prototype.push.apply(chatsUserSecond, dataSnapshot.val());
          chatsUserSecond.push(chatID);
        }
        const updates = {};
        updates[`/users/${currentUserID}/chats`] = chatsUserFirst;
        updates[`/users/${lotOwner}/chats`] = chatsUserSecond;
        this.database.ref().update(updates);
      })
      .then(() => {
        Firebase.log('firebase.addMessageFromLot lotID = ', chatID);
        return Promise.resolve(chatID);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        Firebase.log('firebase.addMessageFromLot error', obj);
        throw e;
      });
    */
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

  static async loadFilesURL(lotStorageRef, files) {
    const imgURLs = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const imgRef = lotStorageRef.child(file.name);
      // eslint-disable-next-line no-await-in-loop
      await imgRef.putString(file, 'data_url')
        .then((uploadTaskSnapshot) => uploadTaskSnapshot.ref.getDownloadURL())
        .then((downloadURL) => {
          imgURLs.push(downloadURL);
          Firebase.log('firebase.loadFiles downloadURL = ', downloadURL);
        });
    }
    return imgURLs;
  }
}
