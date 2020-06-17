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
import AsyncStorage from '@react-native-community/async-storage';
import {LINKS} from '../../constants';
import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  UPDATE_USER,
} from '../types';
import auth from '@react-native-firebase/auth';
import {fire} from '../../services';
import messaging from "@react-native-firebase/messaging";

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

  const stateRef = React.useRef(state);

  React.useEffect(() => {
    stateRef.current = state;
  });

  React.useEffect(() => {
    let authSubscribe = auth().onAuthStateChanged(async res => {
      const userToken = await AsyncStorage.getItem('token');
      if (userToken && res) {
        try {
          await restoreData();
          const user = await $get(LINKS.PROFILE);
          const tok = await AsyncStorage.getItem('token');
          fire.userDoc.get().then(snap => {
            console.log('get');
            dispatch({
              type: RESTORE_TOKEN,
              token: tok,
              user: user.data,
              fbUser: {uid: snap.id, ...snap.data()},
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
        }
      } else {
        dispatch({type: SIGN_OUT});
      }
    });

    return () => {
      authSubscribe();
      console.log('exit');
    }
    //eslint-disable-next-line
  }, []);

  const authContext = {
    signIn: async (loginData, url, email, password) => {
      return new Promise(async (resolve, reject) => {
        try {
          const login = await $post(url, {body: loginData});
          if (!login) {
            Alert.alert('Incorrect email or password');
            return false;
          }
          await AsyncStorage.setItem('token', login.token);
          auth()
            .signInWithEmailAndPassword(email, password)
            .then()
            .catch(e => {
              dispatch({type: SIGN_OUT});
              Alert.alert(e.code);
              reject(e)
            });
        } catch (e) {
          Alert.alert('Incorrect email or password');
          dispatch({type: SIGN_OUT});
          reject(e)
        }
      })
    },
    signOut: async () => {
      await AsyncStorage.removeItem('token');
      dispatch({type: SIGN_OUT});
    },
    updateUser: async () => {
      try {
        const {data} = await $get('/user/profile');

        dispatch({type: UPDATE_USER, user: data});
      } catch (e) {
        alert(e);
      }
    },
    signUp: async (regData) => {
      try {
        const {token} = await $post('/register', {body: regData});
        await AsyncStorage.setItem('token', token);
        const user = await $get(LINKS.PROFILE);
        await restoreData();
        fire.userDoc.get().then(res => {
          dispatch({
            type: SIGN_IN,
            token: token,
            user: user.data,
            fbUser: res.data(),
          });
        });
      } catch (e) {
        alert(e);
      }
    },
    ...state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
