import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { Block } from 'galio-framework';

const { width } = Dimensions.get('screen');

import theme from '../constants/Theme';

export default class Wrap extends React.Component {
  render() {
    const {children, style, ...props} = this.props
    return (
      <Block style={[styles.wrap, style]} {...props}>
        {children}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    width: width,
    paddingTop: theme.SIZES.BASE,
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE / 2,
    backgroundColor: theme.COLORS.APP_BG
  },
});
