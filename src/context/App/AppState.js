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
    const [fitStyles, exercises] = await Promise.all([
      $get(LINKS.STYLE),
      $get(LINKS.EXERCISES)
    ]);
    appDispatch({
      type: RESTORE_DATA,
      fitStyles,
      exercises,
    });
  };

  const handleGoNutrition = async () => {
    const [login, password] = await Promise.all([
      AsyncStorage.getItem('login'),
      AsyncStorage.getItem('password')
    ]);
    let url = 'mynutritionapp://3090902.ra@gmail.com:12345';
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
