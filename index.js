import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import { AppearanceProvider } from 'react-native-appearance';

import configureStore from './src/store'
const store = configureStore();

const Iron = () => (
  <AppearanceProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AppearanceProvider>
)

AppRegistry.registerComponent(appName, () => Iron);

