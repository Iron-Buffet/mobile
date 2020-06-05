import React from 'react';
import {Block} from 'galio-framework';
import {Image, StyleSheet} from 'react-native';
import {theme} from '../constants';

const Loader = () => {
  if (theme.IS_DARK) {
    return (
      <Block flex center middle style={styles.blockDark}>
        <Image source={require('../assets/images/load.gif')} style={styles.image} />
      </Block>
    )
  }
  return (
    <Block flex center middle style={styles.blockWhite}>
      <Image source={require('../assets/images/loader.gif')} style={styles.image} />
    </Block>
  )
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
  blockDark: {
    backgroundColor: '#000',
    alignSelf: 'stretch',
  },
  blockWhite: {
    backgroundColor: '#fff',
    alignSelf: 'stretch',
  },
});

export default Loader;
