import React from 'react';
import {
  StatusBar
} from 'react-native';

import {Block} from 'galio-framework';
import AppContainer from './src/navigation/MainNav';
import {theme} from './src/constants'

const App: () => React$Node = () => {
  return (
    <Block flex style={{backgroundColor: theme.COLORS.APP_BG, alignSelf: 'stretch'}}>
      <StatusBar barStyle={theme.STATUS_BAR} />
      <AppContainer />
    </Block>
  );
};


export default App;
