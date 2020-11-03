/*
 * @link      http://industrialax.com/
 * @email     xristmas365@gmail.com
 * @author    Mark Lebel
 * @copyright Copyright (c) 2020 INDUSTRIALAX SOLUTIONS LLC
 * @license   https://industrialax.com/license
 */

import React from 'react';
import {AppContext} from '../contexts';
import appReducer from './appReducer';
import {$get} from '../../utils/Fetch';
import {RESTORE_DATA} from '../types';
import {LINKS} from '../../constants';
import AsyncStorage from '@react-native-community/async-storage'
import {Linking} from 'react-native'

export const AppState = ({children}) => {
  const initState = {
    isLogged: false,
    fitStyles: [],
    exercises: [],
    currentChat: null,
  };

  const [appState, appDispatch] = React.useReducer(appReducer, initState);

  const restoreData = async () => {
    const fitStyles = await $get(LINKS.STYLE);
    const exercises = await $get(LINKS.EXERCISES);

    appDispatch({
      type: RESTORE_DATA,
      fitStyles,
      exercises,
    });
  };

  const handleGoNutrition = async () => {
    const login = await AsyncStorage.getItem('login');
    const password = await AsyncStorage.getItem('password');
    let url = 'mynutritionapp://';
    if (login && password) {
      url += login + ':' + password;
    }
    if (await Linking.canOpenURL(url)) {
      try {
        await Linking.openURL(url)
      } catch (e) {
      }
    } else {
      const appstoreWeb = 'https://apps.apple.com/us/app/id1530262458'
      if (await Linking.canOpenURL(appstoreWeb)) {
        await Linking.openURL(appstoreWeb)
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...appState,
        appDispatch,
        restoreData,
        handleGoNutrition,
      }}>
      {children}
    </AppContext.Provider>
  );
};
