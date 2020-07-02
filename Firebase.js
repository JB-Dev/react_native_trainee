import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';
class Firebase {
  constructor() {
    this.init();
    this.chatAuth();
  }

  //config firebase...
  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCqkBO1xdAUYYE_qk7G4lP_WcQMzHSOqzQ',
        authDomain: 'react-traineeapp.firebaseapp.com',
        databaseURL: 'https://react-traineeapp.firebaseio.com',
        projectId: 'react-traineeapp',
        storageBucket: 'react-traineeapp.appspot.com',
        messagingSenderId: '363312574351',
        appId: '1:363312574351:web:00588042c25bc59775e5fa',
        measurementId: 'G-9Y2C4G4FRQ',
      });
    }
  };

  chatAuth = () => {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        console.log('Not a User');
        // auth().signInAnonymously();
      }
    });
  };

  //call when create new user...
  createUser = (users) => {
    users.forEach((item) => {
      const user = {
        name: item.name,
        email: item.email,
        profilePic: item.profilePic,
        uid: item.uid,
        deviceToken: item.deviceToken,
      };
      this.dbUser.push(user);
    });
  };

  //used for parse data
  parseUser = (user) => {
    const {name, email, profilePic, uid, deviceToken} = user.val();
    const {key: _id} = user;
    return {
      _id,
      name,
      email,
      profilePic,
      uid,
      deviceToken,
    };
  };

  //used for get users
  getUsers = (callback) => {
    this.dbUser.on('child_added', (snapshot) =>
      callback(this.parseUser(snapshot)),
    );
  };

  //call when send message...
  sendMessages = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: database.ServerValue.TIMESTAMP,
        user: item.user,
      };
      this.dbUser.push(message);
    });
  };

  //used for parsed messages
  //  parseMessage = (message) => {
  //     const {user, text, timestamp} = message.val();
  //     const {key: _id} = message;
  //     const createdAt = new Date(timestamp);
  //     return {
  //       _id,
  //       createdAt,
  //       text,
  //       user,
  //     };
  //   };

  parseMessage = (mes) => {
    const {user, text, timestamp} = mes.val();
    const {key: _id} = mes;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  //used for get messages
  getMessages = (callback, senderId, reciverId) => {
    console.log(senderId, reciverId);
    database()
      .ref(
        `/users/UcPt0oNoNNhkP0rHEBMpTp5T8Xf1/6eSWmcV7N5NDMvXkLAGJOaNdNTx2/messageList/`,
      )
      .on('child_added', (snapshot) => callback(this.parseMessage(snapshot)));
  };

  //close dbUser
  offDbUseres() {
    this.dbUser.off();
  }

  //close dbMessages
  offDbMessages() {
    this.dbMessages.off();
  }

  //get child messages
  get dbMessages() {
    return database().ref(`/users/${senderId}/${reciverId}/messageList/`);
  }

  //get child users
  get dbUser() {
    return database().ref('users');
  }

  //get user uid
  get uid() {
    return (auth().currentUser || {}).uid;
  }
}

export default new Firebase();
