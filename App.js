import React from 'react';
import {
  StatusBar,
  Linking
} from 'react-native';

import {Block} from 'galio-framework';
import AppNavigation from './src/navigation/MainNav';
import {theme} from './src/constants'
import {AppState} from "./src/context/App/AppState";
import {AuthState} from "./src/context/Auth/AuthState";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
const PushNotification = require("react-native-push-notification");
import messaging from '@react-native-firebase/messaging';

console.disableYellowBox = true;
const App: () => React$Node = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      PushNotification.setApplicationIconBadgeNumber(0);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  });
  React.useEffect(() => {
    PushNotification.setApplicationIconBadgeNumber(0);
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        title: remoteMessage.data.notification.title,
        message: remoteMessage.data.notification.body,
        playSound: true,
        soundName: 'default',
      });
    });

    return () => {
      unsubscribe()
    };
  }, []);

  return (
    <Block flex style={{backgroundColor: theme.COLORS.APP_BG, alignSelf: 'stretch'}}>
      <StatusBar barStyle={theme.STATUS_BAR} />
      <AppState>
        <AuthState>
          <AppNavigation initRoute={`desk`} />
        </AuthState>
      </AppState>
    </Block>
  );
};


export default App;
