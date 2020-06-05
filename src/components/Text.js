/**
 * Default text component with default text color and regular font size
 * Received props:
 * title - prop for accepting title styles.
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'galio-framework';

import theme from '../constants/Theme';

export default class IText extends React.Component {
  render() {
    const {children, color, title, flex, style, ...props} = this.props;
    const textStyle = [
      styles.text,
      title && styles.title,
      flex && styles.flex,
      !!color && {color},
      style,
    ];
    return (
      <Text style={textStyle} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: theme.COLORS.TEXT,
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
  flex: {
    flex: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  title: {
    marginBottom: theme.SIZES.BASE,
    textTransform: 'uppercase',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 20,
    color: theme.COLORS.TEXT,
  },
});
