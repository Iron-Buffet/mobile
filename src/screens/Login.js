import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { Block } from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, Button, Input } from "../components";
import { LINKS } from '../constants'
import {checkEmail} from "../constants/utils";

import { $post } from '../utils/Fetch'

import theme from '../constants/Theme';
import LoadingData from '../components/LoadingData'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEmailChecked: false,
      emailChecking: false,
      email: '',
      password: '',
      user: null,
      form: null
    };
  }
  backPressHandler = () => {
    this.setState({
      isEmailChecked: false,
      email: '',
      password: '',
      user: null,
    });
  };
  continuePressHandler = async () => {
    const form = new FormData;
    const { email } = this.state;
    const { navigation } = this.props;
    form.append('email', email.toLowerCase());
    if (!this.state.isEmailChecked) {
      if (checkEmail(email)) {
        this.setState({
          emailChecking: true
        });
        try {
          const user = await $post(LINKS.CHECK_EMAIL, {body: form});
          if (user) {
            this.setState({
              user,
              emailChecking: false,
              isEmailChecked: true
            });
          } else {
            this.setState({
              emailChecking: false
            });
            await AsyncStorage.setItem('email', email);
            navigation.navigate({routeName: 'Register'})
          }
        } catch (e) {
          alert(e.message)
        }
      } else {
        alert('Check your email')
      }
    } else {
      const { password } = this.state;
      if (password) {
        form.append('password', password);
        this.setState({
          isLoading: true,
          form
        });
      } else {
        alert('Enter password')
      }
    }
  };

  onSuccess = () => {
    const {navigation} = this.props;
    this.setState({
      isLoading: false
    });
    navigation.navigate('Dashboard');
  };

  onError = () => {
    this.setState({
      isLoading: false
    });
    alert('Incorrect Email or Password')
  };

  render() {
    const {
      isLoading,
      isEmailChecked,
      emailChecking,
      user,
      form
    } = this.state;

    if(isLoading){
      return(
        <LoadingData
          url={LINKS.LOGIN}
          form={form}
          onSuccess={() => this.onSuccess()}
          onError={() => this.onError()}
        />
      )
    }

    return (
      <Block middle style={styles.container}>
        <Text style={styles.title} color="red">
          IRON BUFFET
        </Text>
        <Block style={{position: 'relative'}}>
          {
            user ? (
              <Block>
                <Text style={styles.email}>{user.email}</Text>
                <Text title>
                  Hello, {user.name}
                </Text>
              </Block>
            ) : (
              <Input
                placeholder="Enter Your Email To Get Started"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
            )
          }
          { emailChecking && <ActivityIndicator style={styles.emailLoader}/> }
        </Block>
        {
          isEmailChecked && (
            <Input
              placeholder="Password"
              password
              onChangeText={(password) => this.setState({ password })}
            />
          )
        }
        <Button
          shadowless
          style={styles.button}
          color={theme.COLORS.BUTTON_COLOR}
          onPress={this.continuePressHandler}>
          continue
        </Button>
           {
             isEmailChecked && (
               <Block row space="between" style={{ alignSelf: 'stretch',marginTop: theme.SIZES.BASE}}>
                <TouchableOpacity onPress={this.backPressHandler}>
                   <Text style={{color: theme.COLORS.TEXT}} >Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Reset password')}>
                   <Text style={{color: theme.COLORS.TEXT}}>Reset password</Text>
                </TouchableOpacity>
              </Block>
             )
           }
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.APP_BG,
    alignItems: 'stretch'
  },
  title: {
    color: theme.COLORS.PRIMARY,
    fontWeight: 'bold',
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 20
  },
  button: {
    marginTop: 20
  },
  emailLoader: {
    position: 'absolute',
    right: 5,
    bottom: 20
  },
  email: {
    alignSelf: 'center',
    color: theme.COLORS.MUTED
  }
});

export default Login
