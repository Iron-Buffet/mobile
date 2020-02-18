import React from "react";
import { Dimensions } from "react-native";

import Drawer from './components/Drawer'
import {theme} from '../constants'

const { width } = Dimensions.get('screen');

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: theme.COLORS.CARD_BG,
  drawerWidth: width * 0.8,
  edgeWidth: width * 0.2,
  unmountInactiveRoutes: true,
  drawerType: 'back',
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: theme.COLORS.DEFAULT,
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.75,
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal',
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
};

export default Menu;

