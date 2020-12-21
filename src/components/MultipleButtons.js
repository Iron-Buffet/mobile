import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Block} from 'galio-framework';
import {Text} from './index';
import theme from '../constants/Theme';

const MultipleButtons = ({onDecrease, onIncrease}) => {


  return (
    <Block style={styles.container}>
      <TouchableOpacity onPress={onDecrease}>
        <Text style={styles.btn}>-</Text>
      </TouchableOpacity>
      <Block style={styles.spacer} />
      <TouchableOpacity onPress={onIncrease}>
        <Text style={styles.btn}>+</Text>
      </TouchableOpacity>
    </Block>
  )
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#fff',
    shadowRadius: 2,
    width: 100,
    borderRadius: 5,
    height: 30,
    shadowOpacity: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  spacer: {
    width: 2,
    height: 25,
    backgroundColor: '#ddd',
  },
  btn: {
    width: 49,
    height: 30,
    textAlign: 'center',
    paddingTop: 3,
  }
});

export default MultipleButtons;
