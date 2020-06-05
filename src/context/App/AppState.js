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

  return (
    <AppContext.Provider
      value={{
        ...appState,
        appDispatch,
        restoreData,
      }}>
      {children}
    </AppContext.Provider>
  );
};
