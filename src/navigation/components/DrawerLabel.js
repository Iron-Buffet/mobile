import React from 'react';
import {StyleSheet} from 'react-native';
import {Block} from 'galio-framework';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Text from '../../components/Text';

import {theme} from '../../constants';
import {shadow} from '../../utils/globalStyles';

const DrawerLabel = ({focused, title, icon}) => {
  return (
    <Block
      flex
      row
      style={[
        styles.defaultStyle,
        focused ? [styles.activeStyle, styles.shadow] : null,
      ]}>
      <Block middle style={{marginRight: 14}}>
        <Icon
          name={icon.name}
          style={[styles.icon, focused ? {color: theme.COLORS.TEXT} : null]}
        />
      </Block>
      <Block row center>
        <Text style={[styles.label]}>{title}</Text>
      </Block>
    </Block>
  );
};

export default DrawerLabel;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingHorizontal: 8,
  },
  activeStyle: {
    backgroundColor: theme.COLORS.PRIMARY,
    borderRadius: 4,
    color: theme.COLORS.WHITE,
  },
  // shadow,
  icon: {
    fontSize: 22,
    color: theme.COLORS.TEXT,
  },
  label: {
    fontSize: 16,
    color: theme.COLORS.TEXT,
    textTransform: 'uppercase',
  },
});
