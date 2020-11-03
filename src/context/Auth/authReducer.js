/*
 * @link      http://industrialax.com/
 * @email     xristmas365@gmail.com
 * @author    Mark Lebel
 * @copyright Copyright (c) 2020 INDUSTRIALAX SOLUTIONS LLC
 * @license   https://industrialax.com/license
 */

import {
  SIGN_IN,
  SIGN_OUT,
  RESTORE_TOKEN,
  UPDATE_USER,
  UPDATE_FBUSER,
  SET_CHATS,
  SET_LOADING,
  ADD_CHAT,
  CLEAR_CHAT_LIST,
  SET_CURRENT_CHAT,
} from '../types';

export default (prevState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        isSignout: false,
        user: action.user,
        fbUser: action.fbUser,
      };
    case SIGN_IN:
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        user: action.user,
        fbUser: action.fbUser,
      };
    case UPDATE_USER:
      return {
        ...prevState,
        user: action.user,
        fbUser: action.fbUser,
      };
    case UPDATE_FBUSER:
      return {
        ...prevState,
        fbUser: action.fbUser,
      };
    case SET_CURRENT_CHAT:
      return {
        ...prevState,
        currentChat: action.chat,
      };
    case SET_CHATS:
      return {
        ...prevState,
        chats: action.chats,
      };
    case ADD_CHAT:
      return {
        ...prevState,
        chats: [action.chat, ...prevState.chats],
      };
    case CLEAR_CHAT_LIST:
      return {
        ...prevState,
        chats: [],
      };
    case SET_LOADING:
      return {
        ...prevState,
        isLoading: true,
      };
    case SIGN_OUT:
      console.log('signed out')
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        isLoading: false,
      };
    default:
      return prevState;
  }
};
