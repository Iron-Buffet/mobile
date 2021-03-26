import React from 'react';
import {Alert, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Block} from 'galio-framework';
import {Button, Input, Loader, MainInfo, Text, Wrap, AdditionalInfo} from '../components';
import theme from '../constants/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInputMask} from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';
import {cardInput} from '../utils/globalStyles';
import {PROFILE, utils} from '../constants';
import {AuthContext} from '../context/contexts';
import {fire} from '../services';

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
    plan: 'trial',
    date: new Date('1/1/2000'),
    currentStep: 1,
    cardNumber: null,
    month: null,
    year: null,
    cvv: null,
    loading: false,
    form: null,
    phone: null,
    terms: false,
    avatar: '',
    gender: 0,
    height: null,
    weight: null,
    // additional
    generalUnits: 0,
    energyUnits: 0,
    dateFormat: 0,
    lactation: 0,
    BMRCalcMethod: 0,
    RMRValue: null,
    BMR: null,
    bodyType: 0,
    profession: 0,
    weightGoals: 0,
    goalWeight: 0,
    goalRate: 0,
    expirationDate: new Date('1/1/2000'),
    mealTypeId: 3,
    hideTemplates: 0,
    heartDisease: 0,
    liverDisease: 0,
    pancreaticDisease: 0,
    anemia: 0,
    kidneyDisease: 0,
    hypoglycemia: 0,
    diabetes: 0,
    hypertension: 0,
    histHeartDisease: 0,
    histBreastCancer: 0,
    histCancerOther: 0,
    histLiverDisease: 0,
    histStroke: 0,
    histOsteoporosis: 0,
    histHypoglycemia: 0,
    histDiabetes: 0,
    histHypertension: 0,
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

  const nextBtnHandler = async () => {
    const {
      currentStep,
      password,
      firstName,
      lastName,
      phone,
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
          if (!(password && firstName && lastName && date && phone)) {
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
        await register();
        break;
      case 5:
        if (!plan) {
          alert('Create your plan');
        } else {
          if (plan === 'trial') {
            await register();
          } else {
            setState({
              ...state,
              currentStep: 6,
            });
          }
        }
        break;
      case 6:
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

  const renderMainInfo = () => {
    return (
      <MainInfo
        state={state}
        handleAvatarPicked={avatar => setState({...state, avatar})}
        handleSetPassword={password => setState({...state, password})}
        handleSetFirstName={firstName => setState({...state, firstName})}
        handleSetLastName={lastName => setState({...state, lastName})}
        handleSetPhone={phone => setState({...state, phone})}
        handleSetDate={date => setState({...state, date})}
        handleAcceptTerms={terms => setState({...state, terms})}
      />
    );
  };

  const renderExpLevel = () => {
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

  const renderGoals = () => {
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

  const renderPlan = () => {
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

  const renderAdditionalInfo = () => {
    return (
      <AdditionalInfo
        setGeneralUnits={generalUnits => {
          let goalRate = .25;
          if (generalUnits === 1) {
            goalRate = .11
          }
          setState({...state, generalUnits, goalRate})
        }}
        setEnergyUnits={energyUnits => setState({...state, energyUnits})}
        setDateFormat={dateFormat => setState({...state, dateFormat})}
        setGender={gender => setState({...state, gender})}
        setWeight={weight => setState({...state, weight})}
        setHeight={height => setState({...state, height})}
        setLactation={lactation => setState({...state, lactation})}
        setBMRCalcMethod={BMRCalcMethod => setState({...state, BMRCalcMethod})}
        setRMRValue={RMRValue => setState({...state, RMRValue})}
        setBMR={BMR => setState({...state, BMR})}
        setBodyType={bodyType => setState({...state, bodyType})}
        setProfession={profession => setState({...state, profession})}
        setWeightGoals={weightGoals => {
          let goalRate = .25;
          if (state.generalUnits === 1) {
            goalRate = .11
          }
          setState({...state, weightGoals, goalRate})
        }}
        setGoalWeight={goalWeight => setState({...state, goalWeight})}
        setGoalRate={goalRate => setState({...state, goalRate})}
        setExpirationDate={expirationDate => setState({...state, expirationDate})}
        setMealTypeId={mealTypeId => setState({...state, mealTypeId})}
        setHideTemplates={hideTemplates => setState({...state, hideTemplates})}
        setHeartDisease={heartDisease => setState({...state, heartDisease})}
        setLiverDisease={liverDisease => setState({...state, liverDisease})}
        setPancreaticDisease={pancreaticDisease => setState({...state, pancreaticDisease})}
        setAnemia={anemia => setState({...state, anemia})}
        setKidneyDisease={kidneyDisease => setState({...state, kidneyDisease})}
        setHypoglycemia={hypoglycemia => setState({...state, hypoglycemia})}
        setDiabetes={diabetes => setState({...state, diabetes})}
        setHypertension={hypertension => setState({...state, hypertension})}
        setHistHeartDisease={histHeartDisease => setState({...state, histHeartDisease})}
        setHistBreastCancer={histBreastCancer => setState({...state, histBreastCancer})}
        setHistCancerOther={histCancerOther => setState({...state, histCancerOther})}
        setHistLiverDisease={histLiverDisease => setState({...state, histLiverDisease})}
        setHistStroke={histStroke => setState({...state, histStroke})}
        setHistOsteoporosis={histOsteoporosis => setState({...state, histOsteoporosis})}
        setHistHypoglycemia={histHypoglycemia => setState({...state, histHypoglycemia})}
        setHistDiabetes={histDiabetes => setState({...state, histDiabetes})}
        setHistHypertension={histHypertension => setState({...state, histHypertension})}
        state={state} />
    )
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
      phone,
      expLevel,
      goal,
      plan,
      date,
      cardNumber,
      month,
      year,
      cvv,
      gender,
      weight,
      height,
    } = state;
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('phone', phone);
    form.append('level', expLevel);
    form.append('goal', goal.join(','));
    form.append('plan', plan);
    form.append('date', date.toLocaleDateString());
    form.append('card', cardNumber);
    form.append('month', month);
    form.append('year', year);
    form.append('cvv', cvv);
    form.append('gender', gender);
    form.append('weight', weight);
    form.append('height', height);
    form.append('GeneralUnits', state.generalUnits);
    form.append('EnergyUnits', state.energyUnits);
    form.append('DateFormat', state.dateFormat);
    form.append('Lactation', state.lactation);
    form.append('BMRCalcMethod', state.BMRCalcMethod);
    form.append('RMRValue', state.RMRValue);
    form.append('BMR', state.BMR);
    form.append('BodyType', state.bodyType);
    form.append('Profession', state.profession);
    form.append('WeightGoals', state.weightGoals);
    form.append('GoalWeight', state.goalWeight);
    form.append('GoalRate', state.goalRate);
    form.append('ExpirationDate', state.expirationDate.toLocaleDateString());
    form.append('MealTypeID', state.mealTypeId);
    form.append('HideTemplates', state.hideTemplates);
    form.append('HeartDisease', state.heartDisease);
    form.append('LiverDisease', state.liverDisease);
    form.append('PancreaticDisease', state.pancreaticDisease);
    form.append('Anemia', state.anemia);
    form.append('KidneyDisease', state.kidneyDisease);
    form.append('Hypoglycemia', state.hypoglycemia);
    form.append('Diabetes', state.diabetes);
    form.append('Hypertension', state.hypertension);
    form.append('HistHeartDisease', state.histHeartDisease);
    form.append('HistBreastCancer', state.histBreastCancer);
    form.append('HistCancerOther', state.histCancerOther);
    form.append('HistLiverDisease', state.histLiverDisease);
    form.append('HistHypertension', state.histHypertension);
    form.append('HistStroke', state.histStroke);
    form.append('HistOsteoporosis', state.histOsteoporosis);
    form.append('HistHypoglycemia', state.histHypoglycemia);
    form.append('HistDiabetes', state.histDiabetes);
    form.append('HistHypertension', state.histHypertension);
    const usr = {
      first_name: firstName,
      password: password,
      last_name: lastName,
      phone: phone,
      level: expLevel,
      goal: goal.join(','),
      email,
      plan,
      gender,
      weight,
      height,
      avatar: state.avatar,
      dob: date.toLocaleDateString(),
    };
    try {
      await AsyncStorage.setItem('login', email);
      await AsyncStorage.setItem('password', password);
      const uid = await fire.createUser(usr);
      form.append('fb_id', uid);
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
      currentScreen = renderMainInfo();
      break;
    case 2:
      currentScreen = renderExpLevel();
      break;
    case 3:
      currentScreen = renderGoals();
      break;
    case 4:
      currentScreen = renderAdditionalInfo();
      break;
    case 5:
      currentScreen = renderPlan();
      break;
    case 6:
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
    dots.push(<Block key={`dot-${i}`} style={[styles.dot, style]}/>);
  }
  if (state.loading) {
    return <Loader/>;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Wrap>
        <Block safe flex middle style={styles.container}>
          <Block
            style={{
              marginBottom: 'auto',
              marginTop: 'auto',
              paddingTop: 16,
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
          <Block middle style={{marginTop: 32}}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text color={theme.COLORS.TEXT}>
                Already have an account? Go to login
              </Text>
            </TouchableOpacity>
          </Block>

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


  container: {
    alignItems: 'stretch',
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
