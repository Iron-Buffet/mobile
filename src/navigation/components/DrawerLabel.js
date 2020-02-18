import React from 'react';
import { StyleSheet } from 'react-native';
import { Block } from "galio-framework";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/Text'

import {theme} from '../../constants';
import { shadow } from "../../utils/globalStyles";

class DrawerItem extends React.Component {
  render() {
    const { focused, title, icon } = this.props;
    return (
      <Block flex row style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadow] : null]}>
        <Block middle flex={0.1} style={{ marginRight: 14 }}>
          <Icon
            name={icon.name}
            style={[styles.icon, focused ? {color: theme.COLORS.WHITE}: null]}
          />
        </Block>
        <Block row center flex={0.9}>
          <Text style={[styles.label, focused ? {color: theme.COLORS.WHITE}: null]}>
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: theme.COLORS.PRIMARY,
    borderRadius: 4,
    color: theme.COLORS.WHITE
  },
  shadow,
  icon: {
    fontSize: 22,
    color: theme.COLORS.TEXT,
  },
  label: {
    fontSize: 18,
    color: theme.COLORS.TEXT,
    textTransform: 'uppercase'
  }
});
