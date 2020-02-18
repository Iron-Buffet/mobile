import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Block } from 'galio-framework';
import { Input, Text, Button } from '../components';
import theme from '../constants/Theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInputMask } from 'react-native-masked-text'
import RNPickerSelect from 'react-native-picker-select'
import {cardInput} from "../utils/globalStyles";

import {PROFILE, utils} from "../constants";
import LoadingData from "../components/LoadingData";
import {age} from "../utils/methods";

class Register extends React.Component {
  state = {
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
    form: null
  };

  componentDidMount () {
    AsyncStorage.getItem('email').then(email => {
      this.setState({
        email
      })
    });
  }

  nextBtnHandler = () => {
    const {
      currentStep,
      password,
      firstName,
      lastName,
      date,
      expLevel,
      goal,
      plan,
      cardNumber,
      year,
      month,
      cvv
    } = this.state;
    switch (currentStep) {
      case 1:
        if (!(password && firstName && lastName && date)) {
          alert('Check entered data')
        } else {
          this.setState({
            currentStep: 2,
          });
        }
        break;
      case 2:
        if (expLevel === null) {
          alert('Select your experience level')
        } else {
          this.setState({
            currentStep: 3,
          });
        }
        break;
      case 3:
        if (goal.length === 0) {
          alert('Select your goals')
        } else {
          this.setState({
            currentStep: 4,
          });
        }
        break;
      case 4:
        if (!plan) {
          alert('Create your plan')
        } else {
          if (plan === 'trial') {
            this.register()
          } else {
            this.setState({
              currentStep: 5,
            });
          }
        }
        break;
      case 5:
      default:
        if (!(cardNumber && month && year && cvv)) {
          alert('Check entered data')
        } else {
          if (month > 12) {
            alert('Check entered data')
          } else {
            this.register()
          }
        }
    }

  };

  prevBtnHandler = () => {
    const currStep = this.state.currentStep;
    this.setState({
      currentStep: currStep - 1,
    });
  };

  setDate = (event, date) => {
    date = date || this.state.age;
    this.setState({
      date,
    });
  };

  renderStepOne = () => {
    const {date} = this.state;
    return (
      <Block>
        <Block center>
          <Text title style={{marginBottom: 0}}>Registration</Text>
          <Text size={18}>{this.state.email}</Text>
        </Block>
        <Block>
          <Input
            placeholder="Password"
            password
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
          <Input
            placeholder="First name"
            value={this.state.firstName}
            onChangeText={firstName => this.setState({firstName})}
          />
          <Input
            placeholder="Last name"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({lastName})}
          />
          <Input
            placeholder="Date of Birth"
            editable={false}
            value={date.toLocaleDateString() + ' (' + age(date) + ' y.o.)'}
          />
        </Block>
        <DateTimePicker style={styles.date} onChange={this.setDate} value={date} maximumDate={new Date(2010, 12, 31)}  />
      </Block>
    );
  };

  expLevelSelectHandler = expLevel => {
    this.setState({expLevel});
  };

  goalSelectHandler = goal => {
    const goals = [...this.state.goal];
    let newGoals = [];
    if (goals.includes(goal)) {
      newGoals = goals.filter(x => x !== goal)
    } else {
      newGoals = goals.concat(goal)
    }
    this.setState({goal: newGoals});
  };

  planSelectHandler = plan => {
    this.setState({plan});
  };

  renderStepTwo = () => {
    const {expLevel} = this.state;
    const buttons = PROFILE.EXPERIENCE_LEVELS.map((lvl, idx) => {
      const bg = expLevel === idx ? 'transparent' : theme.COLORS.PRIMARY;
      const text = expLevel === idx ? theme.COLORS.TEXT : theme.COLORS.WHITE;
      return (
        <Button
          onPress={() => this.expLevelSelectHandler(idx)}
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
        <Block center style={{marginBottom: 30}}>
          <Text title>Experience level</Text>
        </Block>
        <Block>{buttons}</Block>
      </Block>
    );
  };

  renderStepThree = () => {
    const {goal} = this.state;
    const buttons = PROFILE.GOALS.map((lvl, idx) => {
      const bg = goal.includes(idx) ? 'transparent' : theme.COLORS.PRIMARY;
      const text = goal.includes(idx) ? theme.COLORS.TEXT : theme.COLORS.WHITE;
      return (
        <Button
          onPress={() => this.goalSelectHandler(idx)}
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
        <Block center style={{marginBottom: 30}}>
          <Text title>What's Your Goal?</Text>
        </Block>
        <Block>{buttons}</Block>
      </Block>
    );
  };

  renderStepFour = () => {
    const {plan} = this.state;
    const buttons = PROFILE.PLANS.map((_plan, idx) => {
      const bg = plan === _plan.id ? 'transparent' : theme.COLORS.PRIMARY;
      const text = plan === _plan.id ? theme.COLORS.TEXT : theme.COLORS.WHITE;
      return (
        <Button
          onPress={() => this.planSelectHandler(_plan.id)}
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
        <Block center style={{marginBottom: 30}}>
          <Text title>Create Your Plan</Text>
        </Block>
        <Block>{buttons}</Block>
      </Block>
    );
  };

  renderStepFive = () => {
    return (
      <Block>
        <Text title>Billing Information</Text>
        <Block>
          <TextInputMask
            type={'credit-card'}
            style={styles.cardInput}
            placeholderTextColor={theme.COLORS.TEXT}
            placeholder="Card Number"
            value={this.state.cardNumber}
            onChangeText={cardNumber => {
              this.setState({cardNumber})
            }}
          />
          <Block row space="between">
            <Block row bottom>
              <RNPickerSelect
                onValueChange={month => {
                  this.setState({month})
                }}
                value={this.state.month}
                placeholder={
                  {label: ''}
                }
                items={utils.months}
                style={{
                  inputIOS: [styles.cardInput, {width: 40, paddingHorizontal: 5}],
                }}/>
              <Text style={{fontSize: 20, marginHorizontal: 10, fontFamily: theme.FONT_FAMILY.LIGHT}}>/</Text>
              <RNPickerSelect
                onValueChange={year => {
                  this.setState({year})
                }}
                value={this.state.year}
                items={utils.years}
                placeholder={
                  {label: ''}
                }
                style={{
                  inputIOS: [styles.cardInput, {width: 60, paddingHorizontal: 5}],
                }}/>
            </Block>
            <Input
              placeholder="CVV"
              password
              maxLength={3}
              keyboardType="numeric"
              onChangeText={cvv => this.setState({cvv})}
              style={[styles.cardInput, {width: 150}]}
            />
          </Block>
        </Block>
      </Block>
    )
  };

  register = async () => {
    const {
      email,
      password,
      firstName,
      lastName,
      expLevel,
      goal,
      plan,
      date,
      cardNumber,
      month,
      year,
      cvv,
    } = this.state;
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('level', expLevel);
    form.append('goal', goal.join());
    form.append('plan', plan);
    form.append('date', date.toLocaleDateString());
    form.append('card', cardNumber);
    form.append('month', month);
    form.append('year', year);
    form.append('cvv', cvv);
    this.setState({
      form,
      loading: true,
    });
  };

  onSuccess = () => {
    const {navigation} = this.props;
    this.setState({
      loading: false
    });
    navigation.navigate('Dashboard');
  };

  onError = () => {
    this.setState({
      loading: false
    });
    alert('Incorrect Email or Password')
  };

  render() {

    const {
      loading,
      form
    } = this.state;

    if(loading){
      return(
        <LoadingData
          url={'/register'}
          form={form}
          onSuccess={() => this.onSuccess()}
          onError={() => this.onError()}
        />
      )
    }
    const {currentStep} = this.state;
    const {navigation} = this.props;
    let currentScreen = null;
    switch (currentStep) {
      case 1:
        currentScreen = this.renderStepOne();
        break;
      case 2:
        currentScreen = this.renderStepTwo();
        break;
      case 3:
        currentScreen = this.renderStepThree();
        break;
      case 4:
        currentScreen = this.renderStepFour();
        break;
      case 5:
        currentScreen = this.renderStepFive();
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
    return (
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
                  onPress={this.prevBtnHandler}
                  textStyle={{color: theme.COLORS.TEXT}}
                  back>
                  Back
                </Button>
              ) : null}
              {currentStep <= 5 ? (
                <Button
                  onPress={this.nextBtnHandler}
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
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.SIZES.BASE,
    alignItems: 'stretch'
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.APP_BG,
    alignItems: 'stretch'
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

export default Register
