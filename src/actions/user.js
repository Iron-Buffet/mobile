import {GET_USER} from './types';

export const setUser = user => ({
  type: GET_USER,
  data: user,
});
