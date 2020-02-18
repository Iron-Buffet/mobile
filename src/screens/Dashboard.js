import React from 'react';
import {StyleSheet, Dimensions, Image} from 'react-native';
import { Block } from 'galio-framework';
import {theme} from '../constants'
import Wrap from '../components/Wrap'
import {Button} from '../components'

const { width } = Dimensions.get('screen');

export default class Dashboard extends React.Component {

  btnPressHandler = (route) => {
    const {navigation} = this.props;
    return navigation.navigate(route)
  };

  render() {

    return (
      <Wrap space="between" flex>
        <Image
          style={styles.img}
          source={require('../assets/images/logo.png')}
        />
        <Block style={{marginBottom: 25}}>
          <Button style={styles.button} onPress={() => this.btnPressHandler('DCreateWorkout')}>Design a new workout</Button>
          <Button style={styles.button} onPress={() => this.btnPressHandler('CParts')}>Certified Workouts</Button>
          <Button style={styles.button} onPress={() => this.btnPressHandler('WMParts')}>Workout Management</Button>
        </Block>
      </Wrap>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    marginTop: 70,
    borderRadius: 200,
    width: width - 100,
    height: width - 100,
    alignSelf: 'center'
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.APP_BG,
    shadowColor: theme.COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
  title: {
    marginTop: 50,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.COLORS.TEXT
  },
  button: {
    marginBottom: theme.SIZES.BASE
  }
});
