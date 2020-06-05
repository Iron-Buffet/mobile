import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {LINKS, PROFILE, theme} from '../constants';
import {Input, Wrap, Button, Checkbox, Text, AvatarPicker} from '../components';
import {$get, $post} from '../utils/Fetch';
import RNPickerSelect from 'react-native-picker-select';
import {cardInput} from '../utils/globalStyles';
import {age} from '../utils/methods';
import {bottomButton} from '../utils/globalStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Block, Toast} from 'galio-framework';
import {AuthContext} from '../context/contexts';
import {UPDATE_USER} from '../context/types';
import {fire} from '../services';

const plans = PROFILE.PLANS.map((plan, index) => {
  return {
    label: plan.title,
    key: 'plan' + index,
    value: plan.id,
  };
});

const expLevels = PROFILE.EXPERIENCE_LEVELS.map((el, index) => {
  return {
    label: el,
    key: 'el' + index,
    value: index,
  };
});

const EditProfile = ({navigation}) => {
  const {user, dispatch, fbUser} = React.useContext(AuthContext);
  const date = user.dob ? new Date(user.dob) : new Date('1/1/2000');

  const [state, setState] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    goal: user.goal ? user.goal.split(',') : [],
    plan: '',
    expLevel: user.experience,
    isDatePickerVisible: false,
    phoneNumber: user.phone,
    date,
    avatar: fbUser.avatar || '',
    city: user.city || '',
    zip: user.zip ? user.zip.toString() : '',
    state: user.state || '',
    height: user.height || '',
    weight: user.weight || '',
    toast: false,
    loading: false,
    changedAvatar: false,
  });

  const unsubscribeHandler = () => {
    const url = LINKS.UNSUBSCRIBE + '?id=' + user.id;
    $get(url).then(() => {
      navigation.navigate('Logout');
    });
  };

  const save = () => {
    const form = new FormData();
    form.append('firstname', state.firstName);
    form.append('lastname', state.lastName);
    form.append('phone', state.phoneNumber);
    form.append('city', state.city);
    form.append('state', state.state);
    form.append('zip', state.zip);
    form.append('height', state.height);
    form.append('weight', state.weight);
    form.append('experience', state.expLevel);
    form.append('goal', state.goal.join());
    // form.append('plan', plan);
    form.append('dob', date.toLocaleDateString());
    $post('/profile/update', {body: form}).then(async res => {
      const usr = {
        first_name: state.firstName,
        last_name: state.lastName,
        phone: state.phoneNumber,
        level: state.expLevel,
        goal: state.goal.join(','),
        dob: date.toLocaleDateString(),
        avatar: state.avatar,
        email: user.email,
        plan:  fire.user.plan || '',
        zip: state.zip,
        height: state.height,
        weight: state.weight,
      };
      if (state.changedAvatar) {
        usr.avatar = state.avatar;
      }
      try {
        await fire.updateUser(usr);
        fire.userDoc.get().then(snap => {
          dispatch({
            type: UPDATE_USER,
            user: {role: user.role, ...res.data},
            fbUser: {uid: snap.id, ...snap.data()}
          });
          setState({
            ...state,
            toast: true,
          });
          setTimeout(() => {
            setState({
              ...state,
              toast: false,
            });
          }, 2000);
        })
          .catch(e => {
            console.log(e)
          });

      } catch (e) {
        console.log(e)
      }
    })
      .catch(e => {
        console.log('sql', e)
      });
  };

  const handleConfirm = date => {
    date = date || state.age;
    setState({
      ...state,
      date,
      isDatePickerVisible: false,
    });
  };

  const selectGoal = goal => {
    const goals = [...state.goal];
    let newGoals = [];
    if (goals.includes(goal)) {
      newGoals = goals.filter(x => x !== goal);
    } else {
      newGoals = goals.concat(goal);
    }
    setState({...state, goal: newGoals});
  };

  const {toast} = state;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Wrap>
        <ScrollView>

          <Toast
            isShow={toast}
            style={styles.toast}
            color="success"
            positionIndicator="top">
            Profile updated!
          </Toast>
          <Block>
            <AvatarPicker avatar={state.avatar}  onAvatarPicked={avatar => setState({...state, avatar, changedAvatar: true,})}/>
          </Block>
          <ScrollView>
            <Input
              placeholder="First name"
              value={state.firstName}
              onChangeText={firstName => setState({...state, firstName})}
            />
            <Input
              placeholder="Last name"
              value={state.lastName}
              onChangeText={lastName => setState({...state, lastName})}
            />
            <Input
              placeholder="City"
              value={state.city}
              onChangeText={city => setState({...state, city})}
            />
            <Input
              placeholder="State"
              value={state.state}
              onChangeText={_state => setState({...state, state: _state})}
            />
            <Input
              placeholder="Zip"
              keyboardType="numeric"
              value={state.zip}
              onChangeText={zip => setState({...state, zip})}
            />
            <Input
              placeholder="Weight"
              keyboardType="numeric"
              value={state.weight}
              onChangeText={weight => setState({...state, weight})}
            />
            <Input
              placeholder="Height"
              keyboardType="numeric"
              value={state.height}
              onChangeText={height => setState({...state, height})}
            />
            {/*<RNPickerSelect
          onValueChange={plan => {
            setState({plan: plan ? plan.id : null})
          }}
          value={state.plan}
          placeholder={
            {label: 'Your Plan'}
          }
          items={plans}
          style={{
            inputIOS: styles.cardInput,
            placeholder: {
              color: theme.COLORS.TEXT
            }
          }}/>*/}
            <RNPickerSelect
              onValueChange={el => {
                setState({...state, expLevel: el});
              }}
              value={state.expLevel}
              placeholder={{label: 'Your Experience Level'}}
              items={expLevels}
              style={{
                inputIOS: styles.cardInput,
                placeholder: {
                  color: theme.COLORS.TEXT,
                },
              }}
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
                value={date.toLocaleDateString() + ' (' + age(date) + ' y.o.)'}
              />
            </Block>
            <Block>
              <Text bold>Select your goals</Text>
              {PROFILE.GOALS.map((g, index) => {
                return (
                  <Block style={{marginTop: 5}} key={'ch' + index}>
                    <Checkbox
                      value={state.goal.includes(index.toString())}
                      full
                      onPress={() => {
                        selectGoal(index.toString());
                      }}
                      text={g}
                    />
                  </Block>
                );
              })}
            </Block>
          </ScrollView>
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
          <Block style={{marginTop: 16}}>
            <Button style={bottomButton} onPress={() => save()}>
              Save
            </Button>
          </Block>
        </ScrollView>
      </Wrap>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputOverflow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  toast: {
    position: 'absolute',
    top: 0,
  },
  icon: {
    fontSize: 24,
    color: theme.COLORS.TEXT,
    marginRight: theme.SIZES.BASE,
  },
  title: {
    fontSize: 18,
    color: theme.COLORS.TEXT,
    textTransform: 'uppercase',
  },
  cardInput,
});

export default EditProfile;
