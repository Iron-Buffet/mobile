import React from 'react';
import {Dimensions, StyleSheet, TextInput} from 'react-native';
import theme from '../constants/Theme';

const {width} = Dimensions.get('screen');

const InputComponent = ({
  onChangeText,
  textarea,
  placeholder,
  password,
  style,
  ...props
}) => {
  return (
    <TextInput
      placeholderTextColor={theme.COLORS.TEXT}
      autoCapitalize="none"
      style={[styles.input, textarea && styles.textarea, style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={!!password}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: theme.COLORS.TEXT,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: theme.COLORS.TEXT,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    marginBottom: 10,
    height: 40,
  },
  textarea: {
    height: 100,
  },
});

export default InputComponent;
