/*
 * @link      http://industrialax.com/
 * @email     xristmas365@gmail.com
 * @author    Mark Lebel
 * @copyright Copyright (c) 2020 INDUSTRIALAX SOLUTIONS LLC
 * @license   https://industrialax.com/license
 */

import React from 'react';
import {Alert} from 'react-native';
import {AuthContext, AppContext} from '../contexts';
import authReducer from './authReducer';
import {$get, $post} from '../../utils/Fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LINKS} from '../../constants';
import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_USER,
} from '../types';
import {fire} from '../../services';
import messaging from "@react-native-firebase/messaging";
import firebase from 'firebase/app';
import 'firebase/auth';

export const AuthState = ({children}) => {
  const {restoreData} = React.useContext(AppContext);
  const initState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    user: null,
    fbUser: null,
    chats: [],
    messages: [],
    currentChat: null,
  };

  const [state, dispatch] = React.useReducer(authReducer, initState);
  const { handleGoNutrition } = React.useContext(AppContext);

  const stateRef = React.useRef(state);

  React.useEffect(() => {
    stateRef.current = state;
  });

  const load = async uid => {
    try {
      fire.firestore.collection('users').doc(uid).get().then(async snap => {
        const data = snap.data()
        if (data.api_token) {
          await AsyncStorage.setItem('token', data.api_token);
        }
        const user = await $get(LINKS.PROFILE);
        await restoreData();
        dispatch({
          type: RESTORE_TOKEN,
          token: data.api_token,
          user: user.data,
          fbUser: {uid: snap.id, ...data},
        });
      }).catch(e => alert(e.message));
      messaging()
        .getToken()
        .then(async token => {
          return fire.saveTokenToDatabase(token);
        });
    } catch (e) {
      alert(e.message);
      dispatch({type: SIGN_OUT});
      await AsyncStorage.removeItem('token');
    }
  };

  React.useEffect(() => {
    let authSubscribe = firebase.auth().onAuthStateChanged(async res => {
      if (res) {
        await load(res.uid)
      } else {
        dispatch({type: SIGN_OUT});
        await AsyncStorage.removeItem('token');
      }
    });

    return () => {
      authSubscribe();
    }
    //eslint-disable-next-line
  }, []);

  const authContext = {
    signIn: async (loginData, url, email, password) => {
      return new Promise(async (resolve, reject) => {
        try {
          firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async snap => {
              await load(snap.user.uid)
            })
            .catch(async e => {
              dispatch({type: SIGN_OUT});
              await AsyncStorage.removeItem('token');
              Alert.alert(e.message);
              reject(e)
            });
        } catch (e) {
          dispatch({type: SIGN_OUT});
          Alert.alert('Incorrect email or password');
          await AsyncStorage.removeItem('token');
          reject(e)
        }
      })
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('token');
        await firebase.auth().signOut();
      } catch (e) {} finally {
        dispatch({type: SIGN_OUT});
      }
    },
    updateUser: async () => {
      try {
        const {data} = await $get('/user/profile');
        dispatch({type: UPDATE_USER, user: data});
      } catch (e) {
        alert(e);
      }
    },
    signUp: async regData => {
      try {
        const resp = await $post('/register', {body: regData});
        const {token, ntoken} = resp;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('ntoken', ntoken);
        const user = await $get(LINKS.PROFILE);
        await restoreData();
        const usr = firebase.auth().currentUser;
        await fire.firestore.collection('users').doc(usr.uid).update({
          api_token: token,
        });
        fire.firestore.collection('users').doc(usr.uid).get().then(res => {
          dispatch({
            type: SIGN_IN,
            token: token,
            user: user.data,
            fbUser: res.data(),
          });
          handleGoNutrition();
        });
      } catch (e) {
        dispatch({type: SIGN_OUT});
        alert(e.message);
      }
    },
    ...state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
