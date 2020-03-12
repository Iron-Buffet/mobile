import React from 'react'
import {StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native'
import {connect} from 'react-redux';
import {LINKS, PROFILE, theme} from "../constants";
import {Input, Wrap, Button, Checkbox, Text} from '../components'
import {$get, $post} from "../utils/Fetch";
import RNPickerSelect from "react-native-picker-select";
import {cardInput} from "../utils/globalStyles";
import {age} from "../utils/methods";
import {bottomButton} from "../utils/globalStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Block, Toast} from "galio-framework";
import {setUser} from "../actions/user";

const plans = PROFILE.PLANS.map((plan, index) => {
  return {
    label: plan.title,
    key: 'plan' + index,
    value: plan.id
  }
});
const expLevels = PROFILE.EXPERIENCE_LEVELS.map((el, index) => {
  return {
    label: el,
    key: 'el' + index,
    value: index
  }
});

class EditProfile extends React.Component {

  unsubscribeHandler = () => {
    const {user, navigation} = this.props;
    const url = LINKS.UNSUBSCRIBE + '?id=' + user.id;
    $get(url).then(res => {
      navigation.navigate('Logout')
    })
  };

  state = {
    firstName: '',
    lastName: '',
    goal: [],
    plan: null,
    expLevel: null,
    isDatePickerVisible: false,
    phoneNumber: '',
    date: new Date(),
    city: '',
    zip: '',
    state: '',
    height: '',
    weight: '',
    toast: false,
    loading: false,
  };

  saveProfile = () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      expLevel,
      city,
      state,
      zip,
      height,
      weight,
      date,
      goal,
    } = this.state;
    const form = new FormData();
    form.append('firstname', firstName);
    form.append('lastname', lastName);
    form.append('phone', phoneNumber);
    form.append('city', city);
    form.append('state', state);
    form.append('zip', zip);
    form.append('height', height);
    form.append('weight', weight);
    form.append('experience', expLevel);
    form.append('goal', goal.join());
    // form.append('plan', plan);
    form.append('dob', date.toLocaleDateString());
    $post('/profile/update', {body: form}).then(res => {
      this.props.setUser(res.data);
      this.setState({
        toast: true
      });
      setTimeout(() => {
        this.setState({
          toast: false
        })
      }, 2000)
    })
  };

  handleConfirm = date => {
    this.setDate(date);
    this.setState({
      isDatePickerVisible: false
    });
  };

  setDate = (date) => {
    date = date || this.state.age;
    this.setState({
      date,
    });
  };

  selectGoal = (goal) => {
      const goals = [...this.state.goal];
      let newGoals = [];
      if (goals.includes(goal)) {
          newGoals = goals.filter(x => x !== goal)
      } else {
          newGoals = goals.concat(goal)
      }
      this.setState({goal: newGoals});
  };

  componentDidMount () {
    const {user} = this.props;

    const date = user.dob ? new Date(user.dob) : new Date('1/1/2000');
    this.setState({
      goal: user.goal ? user.goal.split(',') : [],
      firstName: user.firstName,
      lastName: user.lastName,
      expLevel: user.experience,
      phoneNumber: user.phone,
      city: user.city || '',
      state: user.state || '',
      zip: user.zip ? user.zip.toString() : '',
      height: user.height || '',
      weight: user.weight || '',
      date
    })
  }

  render() {
    const {date, toast} = this.state;
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Wrap>
          <Toast isShow={toast} style={styles.toast} color="success" positionIndicator="top">Profile updated!</Toast>
          <ScrollView>
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
              placeholder="City"
              value={this.state.city}
              onChangeText={city => this.setState({city})}
            />
            <Input
              placeholder="State"
              value={this.state.state}
              onChangeText={state => this.setState({state})}
            />
            <Input
              placeholder="Zip"
              keyboardType="numeric"
              value={this.state.zip}
              onChangeText={zip => this.setState({zip})}
            />
            <Input
              placeholder="Weight"
              keyboardType="numeric"
              value={this.state.weight}
              onChangeText={weight => this.setState({weight})}
            />
            <Input
              placeholder="Height"
              keyboardType="numeric"
              value={this.state.height}
              onChangeText={height => this.setState({height})}
            />
            {/*<RNPickerSelect
            onValueChange={plan => {
              this.setState({plan: plan ? plan.id : null})
            }}
            value={this.state.plan}
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
                this.setState({expLevel: el})
              }}
              value={this.state.expLevel}
              placeholder={
                {label: 'Your Experience Level'}
              }
              items={expLevels}
              style={{
                inputIOS: styles.cardInput,
                placeholder: {
                  color: theme.COLORS.TEXT
                }
              }}/>
            <Input
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              keyboardType="phone-pad"
              onChangeText={phoneNumber => this.setState({phoneNumber})}
            />
            <Block style={{position: 'relative'}}>
              <TouchableWithoutFeedback onPress={() => {
                this.setState({
                  isDatePickerVisible: true
                })
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
                  {
                      PROFILE.GOALS.map((g, index) => {
                          return (<Block style={{marginTop: 5}} key={'ch'+index}>
                              <Checkbox value={this.state.goal.includes(index.toString())} full onPress={() => this.selectGoal(index.toString())} text={g} />
                          </Block>)
                      })
                  }
              </Block>
          </ScrollView>
          <DateTimePickerModal
            isVisible={this.state.isDatePickerVisible}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={() => {
              this.setState({
                isDatePickerVisible: false
              })
            }}
          />
          <Button style={bottomButton} onPress={() => this.saveProfile()}>
            Save
          </Button>
        </Wrap>
      </TouchableWithoutFeedback>
    )
  }
}

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
    textTransform: 'uppercase'
  },
  cardInput
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
