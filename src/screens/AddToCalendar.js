import React from 'react'
import {StyleSheet, Switch, TouchableOpacity} from 'react-native'
import {Text, Wrap, Button} from '../components'
import {theme, LINKS, utils} from '../constants'
import PARTS from "../constants/Parts";
import {Block} from "galio-framework";
import {$get, $post} from "../utils/Fetch";
import RNPickerSelect from "react-native-picker-select";
import {cardInput} from "../utils/globalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import {bottomButton} from "../utils/globalStyles";

class AddToCalendar extends React.Component {

  state = {
    selectedParts: [],
    workouts: [],
    selectedWorkout: null,
    emptyWorkouts: false,
    dateTime: new Date(),
    timestamp: Math.floor(Date.now() / 1000)
  };

  setDate = (event, dateTime) => {
    dateTime = dateTime || this.state.dateTime;
    this.setState({
      dateTime,
      timestamp: Date.parse(dateTime) / 1000
    });
  };

  addToCalendar = () => {
    const {selectedWorkout, timestamp} = this.state;
    const {navigation} = this.props;
    if (!selectedWorkout) {
      alert('Select workout');
      return;
    }
    const data = new FormData();
    data.append('id', selectedWorkout);
    data.append('date', timestamp);
    $post('/workout/set-date', { body: data }).then(() => {
      navigation.push('Calendar')
    })
  };

  toggleSwitchHandler = ({id}) => {
    const {selectedParts} = this.state;
    if (selectedParts.includes(id)) {
      let arr = selectedParts.filter(el => el !== id);
      this.setState({
        selectedParts: arr
      }, () => this.getWorkouts())
    } else {
      this.setState({
        selectedParts: [...selectedParts, id]
      }, () => this.getWorkouts())
    }
  };

  getWorkouts = () => {
    const {selectedParts} = this.state;
    this.setState({
      emptyWorkouts: false
    });
    if (selectedParts.length > 0) {
      $get(LINKS.WORKOUT_ALL + '?filter[parts]=' + selectedParts.join(',')).then(res => {
        const workouts = res.map(w => {
          return {
            label: w.name || 'Workout #' + w.id,
            key: w.id,
            value: w.id
          }
        });
        this.setState({
          workouts,
          emptyWorkouts: workouts.length === 0
        })
      })
    } else {
      this.setState({
        workouts: [],
      })
    }
  };

  renderSwitchers = () => {

    return PARTS.map(p => {
      const val = this.state.selectedParts.findIndex(part => part === p.id) !== -1;
      return (
        <Block
          row
          key={`part${p.id}`}
          style={styles.switchWrap}>
          <Switch
            value={val}
            onValueChange={() => this.toggleSwitchHandler(p)}
            style={{marginRight: 10}}
            trackColor={{
              true: theme.COLORS.PRIMARY
            }}
          />
          <Text size={theme.SIZES.BASE}>{p.name}</Text>
        </Block>
      )
    })
  };
  render() {
    const { workouts, emptyWorkouts } = this.state;
    return (
      <Wrap>
        <Block style={styles.switchersContainer}>
          {this.renderSwitchers()}
        </Block>
        <Block flex>
          {
            workouts.length > 0 && (
              <Block flex>
                <RNPickerSelect
                  onValueChange={selectedWorkout => {
                    this.setState({selectedWorkout})
                  }}
                  value={this.state.selectedWorkout}
                  items={workouts}
                  placeholder={
                    {label: 'Select Workout'}
                  }
                  style={{
                    inputIOS: [styles.cardInput],
                  }}/>
                <DateTimePicker
                  style={styles.date}
                  value={this.state.dateTime}
                  mode="datetime"
                  is24Hour={false}
                  onChange={this.setDate} />
                  <Button style={bottomButton} onPress={() => this.addToCalendar()}>
                    Add
                  </Button>
              </Block>
            )
          }
          {
            emptyWorkouts && (<Text style={styles.text}>You have no workouts for this part</Text>)
          }
        </Block>
      </Wrap>
    )
  }
}

const styles = StyleSheet.create({
  switchWrap: {
    marginBottom: theme.SIZES.BASE / 2,
    marginRight: theme.SIZES.BASE / 2,
    width: 150,
    alignItems: 'center'
  },
  switchersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16
  },
  cardInput,
  text: {
    fontSize: theme.SIZES.BASE
  }
});

export default AddToCalendar
