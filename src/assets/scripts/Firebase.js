import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// import User from './User.js';

export default class Firebase {
  constructor(firebaseConfig, debug) {
    this.debug = debug;
    this.fireapp = firebase.initializeApp(firebaseConfig);
    this.log('firebase.initializeApp');
    this.auth = this.fireapp.auth();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.log('firebase.onAuthStateChanged User is signed IN', user.email, user.uid);
      } else {
        this.log('firebase.onAuthStateChanged User is signed out');
      }
    });
    this.database = this.fireapp.database();
    this.storage = this.fireapp.storage();
    this.storageRef = this.storage.ref();
    this.storageLotsRef = this.storageRef.child('lots');
    this.storageUsersRef = this.storageRef.child('users');
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
          karmaCount: 3,
          userID: userCredential.user.uid
        };
        this.log('firebase.signUP OK', userCredential.user.uid);
        const id = userCredential.user.uid;
        return this.addUser(id, user);
      })
      .catch((error) => {
        const obj = {
          code: error.code,
          message: error.message
        };
        this.log('firebase.signUP error', obj);
        throw error;
      });
  }

  addUser(uid, user) {
    const newUser = this.usersNode.child(uid);
    this.log('firebase.addUser Info =', user);
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
        this.log('firebase.addUser error', obj);
        throw e;
      });
  }

  signIN(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.log('firebase.signIN OK', userCredential.user.email, userCredential.user.uid);
        return Promise.resolve(userCredential);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.signIN error', obj);
        throw e;
      });
  }

  signOUT() {
    this.auth.signOut();
  }

  addUserAvatar(dataurl) {
    const userID = this.auth.currentUser.uid;
    const userStorageRef = this.storageUsersRef.child(userID);
    const avatarRef = userStorageRef.child('avatar');
    return avatarRef.putString(dataurl, 'data_url')
      .then((uploadTaskSnapshot) => uploadTaskSnapshot.ref.getDownloadURL())
      .then((downloadURL) => {
        this.log('firebase.addUserAvatar downloadURL = ', downloadURL);
        const userAvatarRef = this.usersNode.child(`${userID}/avatarURL`);
        return userAvatarRef.set(downloadURL);
      })
      .then(() => {
        this.log('firebase.addUserAvatar avatar loaded');
        return Promise.resolve('ok');
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.addUserAvatar error', obj);
        throw e;
      });
  }

  addUserInfo(nickname, phone, location) {
    const userID = this.auth.currentUser.uid;
    // const userRef = this.usersNode.child(userID);
    const updates = {};
    updates[`/users/${userID}/nick`] = nickname;
    updates[`/users/${userID}/phone`] = phone;
    updates[`/users/${userID}/location`] = location;
    this.log('firebase.addUserInfo updates = ', updates);
    return this.database.ref().update(updates)
      .then(() => {
        this.log('firebase.addUserInfo ok');
        return Promise.resolve('ok');
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.addUserInfo error', obj);
        throw e;
      });
  }

  addLotSinglePic(lot) {
    const imgsArray = [];
    const userID = this.auth.currentUser.uid;
    const lotID = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotID);
    const imgRef = lotStorageRef.child(lot.imgFiles[0].name);
    return imgRef.put(lot.imgFiles[0])
      .then((snapshot) => {
        this.log('firebase.addLotSinglePic image loaded ');
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
        this.log('firebase.addLotSinglePic lot =', lotID, newLot);
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
        this.log('firebase.addLotSinglePic userLots =', userLotsArray);
        return dataSnapshot.ref.set(userLotsArray);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.addLotSinglePic error', obj);
        throw e;
      });
  }

  addLotMultiPic(lot) {
    // const userID = this.auth.currentUser.uid;
    const lotID = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotID);
    return Firebase.loadFiles(lotStorageRef, lot.imgFiles)
      .then((imgURLsArray) => {
        const newLot = {
          title: lot.title,
          description: lot.description,
          price: lot.price,
          category: lot.category,
          dtCreate: (new Date()).toJSON(),
          userID: lot.userID,
          lotID,
          imgURLs: imgURLsArray,
          state: lot.state
        };
        const lotRef = this.lotsNode.child(lotID);
        this.log('firebase.addLotMultiPic lot =', lotID, newLot);
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
        this.log('firebase.LotMultiPic userLots =', userLotsArray);
        return dataSnapshot.ref.set(userLotsArray);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.LotMultiPic error', obj);
        throw e;
      });
  }

  addLotMultiPicURL(lot) {
    // const userID = this.auth.currentUser.uid;
    const lotID = this.lotsNode.push().key;
    const lotStorageRef = this.storageLotsRef.child(lotID);
    return Firebase.loadFilesURL(lotStorageRef, lot.imgFiles)
      .then((imgURLsArray) => {
        const newLot = {
          title: lot.title,
          description: lot.description,
          price: lot.price,
          category: lot.category,
          dtCreate: (new Date()).toJSON(),
          userID: lot.userID,
          lotID,
          imgURLs: imgURLsArray,
          state: lot.state
        };
        const lotRef = this.lotsNode.child(lotID);
        this.log('firebase.addLotMultiPicURL lot =', lotID, newLot);
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
        this.log('firebase.addLotMultiPicURL userLots =', userLotsArray);
        return dataSnapshot.ref.set(userLotsArray);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.addLotMultiPicURL error', obj);
        throw e;
      });
  }

  readCurrentUserWishLots() {
    const userID = this.auth.currentUser.uid;
    const refUser = this.usersNode.child(userID);
    return refUser.once('value')
      .then((dataSnapshot) => {
        const user = dataSnapshot.val();
        const lots = user.wishLots;
        if (lots === undefined) {
          return Promise.resolve([]);
        }
        return Firebase.readNodesByID(lots, this.lotsNode);
      })
      .then((data) => {
        this.log('firebase.readCurrentUserWishLots', data);
        return Promise.resolve(data);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.readCurrentUserWishLots error', obj);
        throw e;
      });
  }

  readCurrentUserWinLots() {
    const userID = this.auth.currentUser.uid;
    const refUser = this.usersNode.child(userID);
    return refUser.once('value')
      .then((dataSnapshot) => {
        const user = dataSnapshot.val();
        const lots = user.winLots;
        if (lots === undefined) {
          return Promise.resolve([]);
        }
        return Firebase.readNodesByID(lots, this.lotsNode);
      })
      .then((data) => {
        this.log('firebase.readCurrentUserWishLots', data);
        return Promise.resolve(data);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.readCurrentUserWishLots error', obj);
        throw e;
      });
  }

  readLots() {
    const retPromise = this.lotsNode.orderByChild('state').equalTo(10).once('value').then((snapshot) => {
      const data = snapshot.val();
      this.log('firebase.readLots', data);
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
        this.log('firebase.readUsers error', obj);
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
        this.log('firebase.readUsers error', obj);
        throw e;
      });
  }

  toggleWishLots(lotInfo) {
    const lot = lotInfo.lotID;
    const currentUserID = this.auth.currentUser.uid;
    if (currentUserID === lotInfo.userID) {
      return Promise.reject(new Error('It is your lot'));
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
        this.log('firebase.toggleWish ', ret);
        return Promise.resolve(ret);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.toggleWish error', obj);
        throw e;
      });
  }

  lotStateUpdate(lot, newState, buyer) {
    const currentUserID = this.auth.currentUser.uid;
    const currentLotState = lot.state;
    if (currentLotState === 10) {
      return this.lotsNode.child(lot.lotID).child('state').set(newState)
        .then(() => this.usersNode.child(currentUserID).once('value'))
        .then((dataSnapshot) => {
          const userData = dataSnapshot.val();
          const userWinLots = userData.winLots;
          const arr = [];
          let upd = false;
          if (userWinLots === undefined) {
            arr.push(lot.lotID);
            upd = true;
          } else if (userWinLots.includes(lot.lotID) === false) {
            userWinLots.forEach((element) => arr.push(element));
            arr.push(lot.lotID);
            upd = true;
          }
          if (upd === true) {
            return this.usersNode.child(lot.userID).once('value')
              .then((dataSnapshot1) => {
                const sellerKarmaCount = dataSnapshot1.val().karmaCount + lot.price;
                const buyerKarmaCount = buyer.karmaCount - lot.price;
                const updates = {};
                updates[`/users/${currentUserID}/karmaCount`] = buyerKarmaCount;
                updates[`/users/${lot.userID}/karmaCount`] = sellerKarmaCount;
                updates[`/users/${currentUserID}/winLots`] = arr;
                this.log('firebase.lotStateUpdate updates = ', updates);
                this.database.ref().update(updates);
              });
          }
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({ code: -1, message: 'Already winned' });
        })
        .catch((e) => {
          const obj = {
            code: e.code,
            message: e.message
          };
          this.log('firebase.lotStateUpdate error', obj);
          throw e;
        });
    }
    throw new Error('error');
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
          this.log('firebase.addMessageFromLot need new chat');
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
              this.log('firebase.addMessageFromLot new chatID = ', chatID);
              return Promise.resolve(chatID);
            });
        }
        this.log('firebase.addMessageFromLot chat exist');
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
        this.log('firebase.addMessageFromLot new messageID = ', messageID);
        return messagesRef.child(messageID).set(messageObj);
      })
      .catch((e) => {
        const obj = {
          code: e.code,
          message: e.message
        };
        this.log('firebase.addMessageFromLot error', obj);
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

  log(val, ...rest) {
    if (this.debug === true) {
      if (rest.length > 0) {
        // eslint-disable-next-line no-console
        console.log(val, ...rest);
      } else {
        // eslint-disable-next-line no-console
        console.log(val);
      }
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
          this.log('firebase.loadFiles downloadURL = ', downloadURL);
        });
    }
    return imgURLs;
  }

  static async loadFilesURL(lotStorageRef, files) {
    const imgURLs = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      const imgRef = lotStorageRef.child(Firebase.makeid());
      // eslint-disable-next-line no-await-in-loop
      await imgRef.putString(file, 'data_url')
        .then((uploadTaskSnapshot) => uploadTaskSnapshot.ref.getDownloadURL())
        .then((downloadURL) => {
          imgURLs.push(downloadURL);
          this.log('firebase.loadFiles downloadURL = ', downloadURL);
        });
    }
    return imgURLs;
  }

  static makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static async readNodesByID(nodeIDs, ref) { // nodeIDs: Array
    const nodes = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const nodeID of nodeIDs) {
      // eslint-disable-next-line no-await-in-loop
      await ref.child(nodeID).once('value')
        .then((dataSnapshot) => {
          const obj = dataSnapshot.val();
          nodes.push(obj);
        });
    }
    return nodes;
  }
}
