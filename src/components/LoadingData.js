import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {theme} from '../constants';
import {Block} from 'galio-framework';

const LoadingData = () => {
  return (
    <Block middle center flex style={styles.container}>
      <ActivityIndicator />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.APP_BG,
    alignItems: 'stretch',
  },
  loadText: {
    fontSize: 20,
    marginRight: 10,
  },
  icon: {
    fontSize: 30,
    color: theme.COLORS.SUCCESS,
  },
  loadRow: {
    width: 300,
  },
});

export default LoadingData;
