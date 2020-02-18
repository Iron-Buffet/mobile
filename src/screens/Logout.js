import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Block } from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.logout()
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      this.props.navigation.navigate('Login')
    } catch (e) {
      console.log(e)
    }
  };

  render() {
    return (
      <Block center middle style={styles.container}>
        <ActivityIndicator />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
