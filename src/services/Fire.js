import * as firebase from 'firebase';
import 'firebase/auth';
import {getUtcTimestamp} from '../utils/methods';
import config from './fbConfig';
import {fire} from "./index";

export default class Fire {

  constructor () {
    firebase.initializeApp(config)
  }

  get userDoc() {
    return this.firestore.collection('users').doc(this.uid);
  }

  get firestore() {
    return firebase.firestore();
  }

  get user() {
    return firebase.auth().currentUser || {};
  }


  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }

  saveTokenToDatabase = async token => {
    console.log('save token')
    try {
      await this.userDoc
        .update({
          token,
        });
    } catch (e) {
      // console.log(e)
    }
  };

  uploadPhotoAsync = async (uri, fileName) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(fileName).put(file);
      upload.on(
        'state_changed',
        snapshot => {},
        err => rej(err),
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          return res(url)
        }
      )
    })
  };

  createUser = async user => {
    return new Promise(async (resolve, reject) => {
      try {
        const usr = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
        let remoteUrl = null;
        if (user.avatar) {
          remoteUrl = await this.uploadPhotoAsync(user.avatar, `avatars/${usr.user.uid}`);
        }
        await this.firestore.collection('users').doc(usr.user.uid).set({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: remoteUrl,
          phone: user.phone,
          level: user.level,
          goal: user.goal,
          plan: user.plan,
          dob: user.dob,
        });
        resolve(true)
      } catch (e) {
        reject(e);
        return e;
      }
    })
  };

  updateUser = async user => {
    return new Promise(async (resolve, reject) => {
      try {
        await this.firestore.collection('users').doc(this.uid).update({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          level: user.level,
          goal: user.goal,
          plan: user.plan,
          dob: user.dob,
          zip: user.zip,
          height: user.height,
          weight: user.weight,
        });
        let remoteUrl = null;
        if (user.avatar) {
          remoteUrl = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`);
          await this.firestore.collection('users').doc(this.uid).update({
            avatar: remoteUrl,
          });
        }
        resolve(true)
      } catch (e) {
        reject(e);
        return e;
      }
    });
  };

  updateChats = async () => {
    return new Promise((res, rej) => {
      this.firestore
        .collectionGroup('chats')
        .orderBy('created_at')
        .get().then(snap => {
          let _chats = [];
          snap.forEach(doc => {
            const data = doc.data();
            const showChatsCondition = data.uid === fire.uid || data.is_new || data.trainer === fire.uid;
            if (showChatsCondition) {
              _chats = [{id: doc.id, ...doc.data()}, ..._chats]
            }
          });
          res(_chats);
        })
        .catch(e => {
          rej(e)
        });
    })
  };

  addChat = ({user_name, chat}) => {
    return new Promise((res, rej) => {
      this.userDoc.collection('chats').add({
        chat,
        user_name,
        uid: this.uid,
        created_at: getUtcTimestamp(),
        trainer: null,
        is_new: true,
        users: [this.uid],
      })
        .then(ref => {
          res(ref)
        })
        .catch(e => {
          rej(e)
        });
    })
  };
}
