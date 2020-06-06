import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../constants/links';

async function $get(url, config) {
  let token;
  try {
    token = await AsyncStorage.getItem('token');
    const headers = (config && config.headers) || {};

    const configOptions = {
      ...config,
      method: 'GET',
      credentials: 'omit',
      headers: {
        ...headers,
        'X-Request-With': 'app',
        Authorization: 'Bearer ' + token,
        Cookie: null,
      },
    };
    return fetch(API_URL + url, configOptions).then(r => r.json());
  } catch (e) {
    console.log(e);
  }
}

async function $post(url, config) {
  let token;
  try {
    token = await AsyncStorage.getItem('token');
    console.log(token);
    const body = (config && config.body) || null;
    const headers = (config && config.headers) || {};

    const configOptions = {
      ...config,
      method: 'POST',
      credentials: 'omit',
      headers: {
        ...headers,
        'X-Request-With': 'app',
        Authorization: 'Bearer ' + token,
        Cookie: null,
      },
      body,
    };
    return fetch(API_URL + url, configOptions).then(r => r.json()).catch(e => console.log(e));
  } catch (e) {
    console.log(e);
  }
}

export {$get, $post};
