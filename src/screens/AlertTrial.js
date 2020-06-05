import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Block} from 'galio-framework';
import {theme} from '../constants';
import Wrap from '../components/Wrap';
import {Button, Text} from '../components';

export default class Dashboard extends React.Component {
  btnPressHandler = id => {
    // const {navigation} = this.props;
    console.log(id);
  };

  render() {
    const {navigation} = this.props;

    return (
      <Wrap style={styles.wrap} flex>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.close}>&times;</Text>
        </TouchableOpacity>
        <Block style={{marginTop: 'auto', marginBottom: 'auto'}}>
          <Text title style={styles.title}>
            trial version
          </Text>
        </Block>
        <Button style={styles.btn} onPress={() => this.btnPressHandler()}>
          Get Full Version
        </Button>
      </Wrap>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginBottom: theme.SIZES.BASE,
  },
  wrap: {
    paddingHorizontal: theme.SIZES.BASE,
    justifyContent: 'space-between',
    paddingBottom: 20,
    position: 'relative',
  },
  close: {
    color: theme.COLORS.TEXT,
    width: 30,
    height: 30,
    fontSize: 30,
    lineHeight: 33,
    textAlign: 'center',
    fontFamily: theme.FONT_FAMILY.BOLD,
    position: 'absolute',
    top: 40,
    right: 10,
  },
  title: {
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 40,
  },
});
