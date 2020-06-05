import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { AppearanceProvider } from 'react-native-appearance';
const PushNotification = require("react-native-push-notification");
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  PushNotification.localNotification({
    title: remoteMessage.data.notification.title,
    message: remoteMessage.data.notification.body,
    playSound: true,
    soundName: 'default',
  });
  PushNotification.setApplicationIconBadgeNumber(1);
});
function HeadlessCheck({ isHeadless }) {
  console.log(isHeadless);
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <Iron />;
}

const Iron = () => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);

AppRegistry.registerComponent(appName, () => HeadlessCheck);

