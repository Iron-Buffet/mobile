import React from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import {LINKS, PROFILE, theme} from "../constants";
import {Input, Wrap, Button} from '../components'
import {$get} from "../utils/Fetch";
import RNPickerSelect from "react-native-picker-select";
import {cardInput} from "../utils/globalStyles";
import {age} from "../utils/methods";
import DateTimePicker from "@react-native-community/datetimepicker";
import {bottomButton} from "../utils/globalStyles";


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
    date: new Date()
  };

  expLevelSelectHandler = expLevel => {
    this.setState({expLevel});
  };

  setDate = (event, date) => {
    date = date || this.state.age;
    this.setState({
      date,
    });
  };

  componentDidMount () {
    const {user} = this.props;
    const goals = [];
    let goalsCount = 0;
    for (const key in user.goals) {
      if (user.goals[key]) {
        goals.push(goalsCount)
      }
      goalsCount++;
    }

    const date = user.dob ? new Date(user.dob) : new Date('1/1/2000');

    this.setState({
      goal: goals,
      firstName: user.firstName,
      lastName: user.lastName,
      expLevel: user.expLevel,
      date
    })
  }

  render() {
    const {date} = this.state;
    return (
        <Wrap>
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
          <RNPickerSelect
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
            }}/>
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
            placeholder="Date of Birth"
            editable={false}
            value={date.toLocaleDateString() + ' (' + age(date) + ' y.o.)'}
          />
          <DateTimePicker onChange={this.setDate} value={date} maximumDate={new Date(2010, 1, 1)}  />
          <Button style={bottomButton}>
            Save
          </Button>
        </Wrap>
    )
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(EditProfile)
