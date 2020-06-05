import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {Block} from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, Button, Input, Loader} from '../components';
import {LINKS} from '../constants';
import {checkEmail} from '../constants/utils';

import {$post} from '../utils/Fetch';

import theme from '../constants/Theme';
import {AuthContext} from '../context/contexts';

const Login = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);

  const [state, setState] = React.useState({
    isLoading: false,
    isEmailChecked: false,
    emailChecking: false,
    email: '',
    password: '',
    user: null,
    form: null,
  });

  const backPressHandler = () => {
    setState({
      isEmailChecked: false,
      email: '',
      password: '',
      user: null,
    });
  };

  const continuePressHandler = async () => {
    if (state.isLoading) {
      return false;
    }
    const form = new FormData();
    form.append('email', state.email.toLowerCase());
    if (!state.isEmailChecked) {
      if (checkEmail(state.email)) {
        setState({
          ...state,
          emailChecking: true,
        });
        try {
          const user = await $post(LINKS.CHECK_EMAIL, {body: form});
          if (user) {
            setState({
              ...state,
              user,
              emailChecking: false,
              isEmailChecked: true,
            });
          } else {
            setState({
              ...state,
              emailChecking: false,
            });
            await AsyncStorage.setItem('email', state.email);
            navigation.navigate('Register');
          }
        } catch (e) {
          alert(e.message);
        }
      } else {
        alert('Check your email');
      }
    } else {
      if (state.password) {
        form.append('password', state.password);
        setState({
          ...state,
          // isLoading: true,
          form,
        });
        try {
          await signIn(form, LINKS.LOGIN, state.email, state.password);
        } catch (e) {

          console.log(e)
        }
      } else {
        alert('Enter password');
      }
    }
  };

  const {isEmailChecked, emailChecking, user} = state;

  if (state.isLoading) {
    return <Loader />
  }

  return (
    <Block middle style={styles.container}>
      <Text style={styles.title} color="red">
        IRON BUFFET
      </Text>
      <Block style={{position: 'relative'}}>
        {user ? (
          <Block>
            <Text style={styles.email}>{user.email}</Text>
            <Text title>Hello, {user.name}</Text>
          </Block>
        ) : (
          <Input
            placeholder="Enter Your Email To Get Started"
            keyboardType="email-address"
            value={state.email}
            onChangeText={email => {
              setState({...state, email});
            }}
          />
        )}
        {emailChecking && <ActivityIndicator style={styles.emailLoader} />}
      </Block>
      {isEmailChecked && (
        <Block>
          <Input
            placeholder="Password"
            password
            onChangeText={password => setState({...state, password})}
          />
        </Block>
      )}
      <Button
        shadowless
        style={styles.button}
        color={theme.COLORS.BUTTON_COLOR}
        onPress={continuePressHandler}>
        continue
      </Button>
      {isEmailChecked && (
        <Block
          row
          space="between"
          style={{alignSelf: 'stretch', marginTop: theme.SIZES.BASE}}>
          <TouchableOpacity onPress={backPressHandler}>
            <Text style={{color: theme.COLORS.TEXT}}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Reset password')}>
            <Text style={{color: theme.COLORS.TEXT}}>Reset password</Text>
          </TouchableOpacity>
        </Block>
      )}
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
  title: {
    color: theme.COLORS.PRIMARY,
    fontWeight: 'bold',
    fontSize: 34,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  emailLoader: {
    position: 'absolute',
    right: 5,
    bottom: 20,
  },
  email: {
    alignSelf: 'center',
    color: theme.COLORS.MUTED,
  },
});

export default Login;
