import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'galio-framework';
import Text from './Text'
import { shadow } from "../utils/globalStyles";

import theme from '../constants/Theme';

export default class GaButton extends React.Component {
  render() {
    const { children, style, textStyle, back, small, secondary, ...props } = this.props;
    const styleArray = [
      styles.default,
      small ? styles.buttonSmall : null,
      back ? styles.back : null,
      secondary ? styles.secondary : null,
      style];
    return (
      <Button style={styleArray} {...props}>
        <Text
          style={[
            styles.text,
            back ? styles.textBack : null,
            small ? styles.textSm : null,
            secondary ? styles.secondaryText : null,
            textStyle]}>{children}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    shadowColor: 'transparent',
    width: 'auto',
    backgroundColor: theme.COLORS.PRIMARY,
    ...shadow
  },
  text: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    textTransform: 'uppercase',
    fontSize: 18,
    shadowColor: 'transparent'
  },
  buttonSmall: {
    width: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 35
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.COLORS.PRIMARY
  },
  secondaryText: {
    color: theme.COLORS.TEXT
  },
  textSm: {
    fontSize: 14
  },
  back: {
    width: 80,
    backgroundColor: 'transparent'
  },
  textBack: {
    color: theme.COLORS.TEXT
  },
});
