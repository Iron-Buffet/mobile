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
  SET_CHATS,
} from '../types';
import auth from '@react-native-firebase/auth';
import {fire} from '../../services';
import messaging from "@react-native-firebase/messaging";
const PushNotification = require('react-native-push-notification');
import {checkNotifications} from 'react-native-permissions';


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
    checkNotifications().then(({status, settings}) => {

    });
  }, []);

  React.useEffect(() => {

    if (state.isLoading) {
      const bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');
        if (userToken) {
          try {
            auth().onAuthStateChanged(async res => {
              if (res) {
                await restoreData();
                const user = await $get(LINKS.PROFILE);
                fire.userDoc.get().then(snap => {
                  dispatch({
                    type: RESTORE_TOKEN,
                    token: userToken,
                    user: user.data,
                    fbUser: {uid: snap.id, ...snap.data()},
                  });
                });

                messaging()
                  .getToken()
                  .then(async token => {
                    return fire.saveTokenToDatabase(token);
                  });
              } else {
                dispatch({type: SIGN_OUT});
              }
            });
          } catch (e) {
            alert(e.message);
            dispatch({type: SIGN_OUT});
          }
        } else {
          dispatch({type: SIGN_OUT});
          console.log('e loading data');
        }
      };

      bootstrapAsync();
    } else {
      if (auth().currentUser) {
        return () => {
          messaging().onTokenRefresh(async token => {
            await fire.saveTokenToDatabase(token);
          });
        };
      }
    }

    //eslint-disable-next-line
  }, [state.isLoading]);

  const authContext = {
    signIn: async (loginData, url, email, password) => {
      try {
        const login = await $post(url, {body: loginData});
        if (!login) {
          Alert.alert('Incorrect email or password');
          return false;
        }
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(async res => {
            await AsyncStorage.setItem('token', login.token);
            const user = await $get(LINKS.PROFILE);
            await restoreData();
            dispatch({
              type: SIGN_IN,
              token: login.token,
              user: user.data,
              fbUser: res.user,
            });
          })
          .catch(e => {
            dispatch({type: SIGN_OUT});
            Alert.alert(e.code);
          });
      } catch (e) {
        Alert.alert('Incorrect email or password');
        dispatch({type: SIGN_OUT});
      }
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
        console.log(e);
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
        console.log(e);
      }
    },
    ...state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
