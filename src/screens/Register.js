import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  Alert,
} from 'react-native';
import {Block} from 'galio-framework';
import {Input, Text, Button, Wrap, Loader, AvatarPicker} from '../components';
import theme from '../constants/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import {TextInputMask} from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import {cardInput} from '../utils/globalStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {PROFILE, utils} from '../constants';
import {age} from '../utils/methods';
import {AuthContext} from '../context/contexts';
import {fire} from '../services'

const Register = props => {
  const {navigation} = props;

  const {signUp} = React.useContext(AuthContext);

  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    expLevel: null,
    goal: [],
    plan: '',
    date: new Date('1/1/2000'),
    currentStep: 1,
    cardNumber: null,
    month: null,
    year: null,
    cvv: null,
    loading: false,
    form: null,
    isDatePickerVisible: false,
    phoneNumber: null,
    terms: false,
    avatar: '',
  });

  React.useEffect(() => {
    AsyncStorage.getItem('email').then(email => {
      setState({
        ...state,
        email,
      });
    });
    //eslint-disable-next-line
  }, []);

  const handleConfirm = date => {
    setState({
      ...state,
      date,
      isDatePickerVisible: false,
    });
  };

  const nextBtnHandler = async () => {
    const {
      currentStep,
      password,
      firstName,
      lastName,
      phoneNumber,
      date,
      expLevel,
      goal,
      plan,
      cardNumber,
      year,
      month,
      terms,
      cvv,
    } = state;
    switch (currentStep) {
      case 1:
        if (!terms) {
          alert('You must agree with Terms & Conditions & Privacy Policy');
        } else {
          if (!(password && firstName && lastName && date && phoneNumber)) {
            alert('Check entered data');
          } else {
            setState({
              ...state,
              currentStep: 2,
            });
          }
        }
        break;
      case 2:
        if (expLevel === null) {
          alert('Select your experience level');
        } else {
          setState({
            ...state,
            currentStep: 3,
          });
        }
        break;
      case 3:
        if (goal.length === 0) {
          alert('Select your goals');
        } else {
          setState({
            ...state,
            currentStep: 4,
          });
        }
        break;
      case 4:
        if (!plan) {
          alert('Create your plan');
        } else {
          if (plan === 'trial') {
            await register();
          } else {
            setState({
              ...state,
              currentStep: 5,
            });
          }
        }
        break;
      case 5:
      default:
        if (!(cardNumber && month && year && cvv)) {
          alert('Check entered data');
        } else {
          if (month > 12) {
            alert('Check entered data');
          } else {
            await register();
          }
        }
    }
  };

  const prevBtnHandler = () => {
    const currStep = state.currentStep;
    setState({
      ...state,
      currentStep: currStep - 1,
    });
  };

  const goalSelectHandler = goal => {
    const goals = [...state.goal];
    let newGoals = [];
    if (goals.includes(goal)) {
      newGoals = goals.filter(x => x !== goal);
    } else {
      newGoals = goals.concat(goal);
    }
    setState({...state, goal: newGoals});
  };

  const planSelectHandler = plan => {
    setState({...state, plan});
  };

  const expLevelSelectHandler = expLevel => {
    setState({...state, expLevel});
  };

  const renderStepOne = () => {
    const {date} = state;
    return (
      <Block>
        <Block center>
          <Text title style={styles.mb0}>
            Registration
          </Text>
          <Text size={18}>{state.email}</Text>
          <Block style={{marginTop: 10}}>
            <AvatarPicker avatar={state.avatar} onAvatarPicked={avatar => setState({...state, avatar})} />
          </Block>
        </Block>
        <Block>
          <Input
            placeholder="Password"
            password
            value={state.password}
            onChangeText={password => setState({...state, password})}
          />
          <Input
            placeholder="First Name"
            value={state.firstName}
            onChangeText={firstName => setState({...state, firstName})}
          />
          <Input
            placeholder="Last Name"
            value={state.lastName}
            onChangeText={lastName => setState({...state, lastName})}
          />
          <Input
            placeholder="Phone Number"
            value={state.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={phoneNumber => setState({...state, phoneNumber})}
          />
          <Block style={{position: 'relative'}}>
            <TouchableWithoutFeedback
              onPress={() => {
                setState({
                  ...state,
                  isDatePickerVisible: true,
                });
              }}>
              <Block style={styles.inputOverflow} />
            </TouchableWithoutFeedback>
            <Input
              placeholder="Date of Birth"
              editable={false}
              value={state.date.toLocaleDateString() + ' (' + age(state.date) + ' y.o.)'}
            />
          </Block>
          <Block style={styles.terms}>
            <TouchableOpacity
              onPress={() =>
                setState({
                  ...state,
                  terms: !state.terms,
                })
              }>
              <Block style={styles.checkBorder}>
                {state.terms && <Block style={styles.check} />}
              </Block>
            </TouchableOpacity>
            <Text style={{fontSize: theme.SIZES.BASE * 0.8}}>
              By checking this box I agree on{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL('https://ironbuffet.com/terms-of-use')
                }>
                Terms & Conditions
              </Text>{' '}
              &{' '}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL('https://ironbuffet.com/privacy-policy')
                }>
                Privacy&nbsp;Policy
              </Text>
            </Text>
          </Block>
          <Text style={styles.info}>
            By participating, you consent to receive text and emails messages
            sent by an automatic telephone dialing system. Consent to these
            terms is not a condition of purchase. Message and data rates may
            apply.
          </Text>
        </Block>
      </Block>
    );
  };

  const renderStepTwo = () => {
    const {expLevel} = state;
    const buttons = PROFILE.EXPERIENCE_LEVELS.map((lvl, idx) => {
      const bg = expLevel === idx ? 'transparent' : theme.COLORS.PRIMARY;
      const text = expLevel === idx ? theme.COLORS.TEXT : theme.COLORS.WHITE;
      return (
        <Button
          onPress={() => expLevelSelectHandler(idx)}
          textStyle={{color: text}}
          style={[
            styles.selectBtn,
            {
              backgroundColor: bg,
              borderColor: theme.COLORS.PRIMARY,
              borderWidth: 2,
            },
          ]}
          key={`exp-${idx}`}>
          {lvl}
        </Button>
      );
    });
    return (
      <Block>
        <Block center style={styles.mb30}>
          <Text title>Experience level</Text>
        </Block>
        <Block>{buttons}</Block>
      </Block>
    );
  };

  const renderStepThree = () => {
    const {goal} = state;
    const buttons = PROFILE.GOALS.map((lvl, idx) => {
      const bg = goal.includes(idx) ? 'transparent' : theme.COLORS.PRIMARY;
      const text = goal.includes(idx) ? theme.COLORS.TEXT : theme.COLORS.WHITE;
      return (
        <Button
          onPress={() => goalSelectHandler(idx)}
          textStyle={{color: text}}
          style={[
            styles.selectBtn,
            {
              backgroundColor: bg,
              borderColor: theme.COLORS.PRIMARY,
              borderWidth: 2,
            },
          ]}
          key={`exp-${idx}`}>
          {lvl}
        </Button>
      );
    });
    return (
      <Block>
        <Block center style={styles.mb30}>
          <Text title>What's Your Goal?</Text>
        </Block>
        <Block>{buttons}</Block>
      </Block>
    );
  };

  const renderStepFour = () => {
    const {plan} = state;
    const buttons = PROFILE.PLANS.map((_plan, idx) => {
      const bg = plan === _plan.id ? 'transparent' : theme.COLORS.PRIMARY;
      const text = plan === _plan.id ? theme.COLORS.TEXT : theme.COLORS.WHITE;
      return (
        <Button
          onPress={() => planSelectHandler(_plan.id)}
          textStyle={{color: text}}
          style={[
            styles.selectBtn,
            {
              backgroundColor: bg,
              borderColor: theme.COLORS.PRIMARY,
              borderWidth: 2,
            },
          ]}
          key={`exp-${idx}`}>
          {_plan.title}
        </Button>
      );
    });
    return (
      <Block>
        <Block center style={styles.mb30}>
          <Text title>Create Your Plan</Text>
        </Block>
        <Block>{buttons}</Block>
      </Block>
    );
  };

  const renderStepFive = () => {
    return (
      <Block>
        <Text title>Billing Information</Text>
        <Block>
          <TextInputMask
            type={'credit-card'}
            style={styles.cardInput}
            placeholderTextColor={theme.COLORS.TEXT}
            placeholder="Card Number"
            value={state.cardNumber}
            onChangeText={cardNumber => {
              setState({...state, cardNumber});
            }}
          />
          <Block row space="between">
            <Block row bottom>
              <RNPickerSelect
                onValueChange={month => {
                  setState({...state, month});
                }}
                value={state.month}
                placeholder={{label: ''}}
                items={utils.months}
                style={{
                  inputIOS: [
                    styles.cardInput,
                    {width: 40, paddingHorizontal: 5},
                  ],
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontFamily: theme.FONT_FAMILY.LIGHT,
                }}>
                /
              </Text>
              <RNPickerSelect
                onValueChange={year => {
                  setState({...state, year});
                }}
                value={state.year}
                items={utils.years}
                placeholder={{label: ''}}
                style={{
                  inputIOS: [
                    styles.cardInput,
                    {width: 60, paddingHorizontal: 5},
                  ],
                }}
              />
            </Block>
            <Input
              placeholder="CVV"
              password
              maxLength={3}
              keyboardType="numeric"
              onChangeText={cvv => setState({...state, cvv})}
              style={[styles.cardInput, {width: 150}]}
            />
          </Block>
        </Block>
      </Block>
    );
  };

  const register = async () => {
    setState({
      ...state,
      loading: true,
    });
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      expLevel,
      goal,
      plan,
      date,
      cardNumber,
      month,
      year,
      cvv,
    } = state;
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('phone', phoneNumber);
    form.append('level', expLevel);
    form.append('goal', goal.join(','));
    form.append('plan', plan);
    form.append('date', date.toLocaleDateString());
    form.append('card', cardNumber);
    form.append('month', month);
    form.append('year', year);
    form.append('cvv', cvv);
    const usr = {
      first_name: firstName,
      password: password,
      last_name: lastName,
      phone: phoneNumber,
      level: expLevel,
      goal: goal.join(','),
      email,
      plan,
      avatar: state.avatar,
      dob: date.toLocaleDateString(),
    };
    try {
      await AsyncStorage.setItem('login', usr.email);
      await AsyncStorage.setItem('password', usr.password);
      await fire.createUser(usr);
      await signUp(form);
    } catch (error) {
      setState({
        ...state,
        loading: false,
      });
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('The given password is invalid');
      } else {
        Alert.alert(error.message);
      }
    }
  };

  const {currentStep} = state;
  let currentScreen = null;
  switch (currentStep) {
    case 1:
      currentScreen = renderStepOne();
      break;
    case 2:
      currentScreen = renderStepTwo();
      break;
    case 3:
      currentScreen = renderStepThree();
      break;
    case 4:
      currentScreen = renderStepFour();
      break;
    case 5:
      currentScreen = renderStepFive();
      break;
  }
  let dots = [];
  for (let i = 1; i <= 5; i++) {
    let style = {};
    if (i <= currentStep) {
      style.backgroundColor = theme.COLORS.PRIMARY;
    } else {
      style.backgroundColor = theme.COLORS.TEXT;
    }
    dots.push(<Block key={`dot-${i}`} style={[styles.dot, style]} />);
  }
  if (state.loading) {
    return <Loader />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrap>
        <Block safe flex middle style={styles.container}>
          <Block
            style={{
              marginBottom: 'auto',
              marginTop: 'auto',
            }}>
            {currentScreen}
            <Block row center middle style={{marginVertical: 30}}>
              {dots}
            </Block>
            {currentStep <= dots.length ? (
              <Block row>
                {currentStep > 1 ? (
                  <Button
                    onPress={prevBtnHandler}
                    textStyle={{color: theme.COLORS.TEXT}}
                    back>
                    Back
                  </Button>
                ) : null}
                {currentStep <= 5 ? (
                  <Button
                    onPress={nextBtnHandler}
                    style={[styles.btn, {marginLeft: 'auto'}]}
                    color={theme.COLORS.PRIMARY}>
                    {currentStep === 5 ? 'Join' : 'Next'}
                  </Button>
                ) : null}
              </Block>
            ) : null}
          </Block>
          <Block middle>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text color={theme.COLORS.TEXT}>
                Already have an account? Go to login
              </Text>
            </TouchableOpacity>
          </Block>
          <DateTimePickerModal
            isVisible={state.isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            isDarkModeEnabled={theme.IS_DARK}
            onCancel={() => {
              setState({
                ...state,
                isDatePickerVisible: false,
              });
            }}
          />
        </Block>
      </Wrap>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mb30: {
    marginBottom: 30,
  },
  mb0: {
    marginBottom: 0,
  },
  inputOverflow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: theme.COLORS.TEXT,
  },
  info: {
    fontSize: 10,
    marginTop: theme.SIZES.BASE,
  },
  terms: {
    marginTop: theme.SIZES.BASE,
    flexDirection: 'row',
  },
  container: {
    alignItems: 'stretch',
  },
  checkBorder: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: theme.COLORS.MUTED,
    width: 20,
    height: 20,
    position: 'relative',
    marginRight: theme.SIZES.BASE / 2,
  },
  check: {
    width: 20,
    height: 10,
    borderColor: theme.COLORS.PRIMARY,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    position: 'absolute',
    top: -3,
    left: 2,
    transform: [{rotate: '-45deg'}],
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.APP_BG,
    alignItems: 'stretch',
  },
  btn: {
    width: 100,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  date: {
    zIndex: 30,
    color: theme.COLORS.TEXT,
  },
  selectBtn: {
    backgroundColor: theme.COLORS.PRIMARY,
    marginBottom: theme.SIZES.BASE,
    shadowColor: 'transparent',
  },
  listItem: {
    marginVertical: 10,
  },
  cardInput,
});

export default Register;
