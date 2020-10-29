import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {Block} from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, Button, Input, Loader} from '../components';
import {LINKS} from '../constants';
import {checkEmail} from '../constants/utils';
import firebase from 'firebase/app';
import 'firebase/auth';

import {$post} from '../utils/Fetch';

import theme from '../constants/Theme';
import {AuthContext} from '../context/contexts';

const {height} = Dimensions.get('screen');

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

  const [totalHeight, setTotalHeight] = React.useState(height);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (e) => {
    setTotalHeight(height - e.endCoordinates.height);
  };

  const _keyboardDidHide = () => {
    setTotalHeight(height);
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
          console.log('user', user)
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
          setState({
            ...state,
            emailChecking: false,
          });
          alert(e.message);
        }
      } else {
        alert('Check your email');
      }
    } else {
      if (state.password) {
        await AsyncStorage.setItem('login', state.email);
        await AsyncStorage.setItem('password', state.password);
        form.append('password', state.password);
        setState({
          ...state,
          isLoading: true,
          form,
        });
        try {
          console.log('start login');
          await signIn(form, LINKS.LOGIN, state.email, state.password);
          console.log('end login');
        } catch (e) {}
        finally {
          setState({
            ...state,
            isLoading: false,
          });
        }
      } else {
        setState({
          ...state,
          isLoading: false,
        });
        alert('Enter password');
      }
    }
  };

  const resetPassword = () => {
    firebase.auth().sendPasswordResetEmail(state.email).then(() => {
      alert('Thank you. A password reset request has been sent to your email.')
    }).catch(e => {
      alert(e.message);
    })
  };

  const {isEmailChecked, emailChecking, user} = state;

  if (state.isLoading) {
    return <Loader />
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Block style={{
        ...styles.container,
        height: totalHeight,
        justifyContent: totalHeight === height ? 'center' : 'flex-end',
        paddingBottom: totalHeight === height ? 0 : 20,
      }}>
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
            <TouchableOpacity onPress={() => resetPassword()}>
              <Text style={{color: theme.COLORS.TEXT}}>Reset password</Text>
            </TouchableOpacity>
          </Block>
        )}
      </Block>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
