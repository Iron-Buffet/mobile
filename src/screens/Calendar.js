import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Block } from 'galio-framework';
import theme from '../constants/Theme'
import XDate from 'xdate';

import { Agenda } from "react-native-calendars";
import { $get } from '../utils/Fetch'

import { Button, Text, Wrap } from '../components'

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
    }
  }

  getShortMonth() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  getShortDay() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  }

  componentDidMount() {
    const date = {};
    date.timestamp = (new Date()).getTime();
    this.loadItems(date)
  }

  loadItems = (day) => {
    $get('/workout/events-mobile?time=' + day.timestamp).then(res => {
      console.log(res)
      this.setState({
        items: res,
      })
    })
  };

  renderDay = (day) => {
    if (!day) {
      return <Block center style={styles.day} />
    }
    const xDate = new XDate(day.timestamp, true);
    const d = xDate.getDay();
    const date = xDate.getDate();
    const month = xDate.getMonth();
    return (
      <Block center style={styles.day}>
        <Block row>
          <Text style={styles.dayText}>{this.getShortMonth()[month]}</Text>
          <Text style={styles.dayText}> {date}</Text>
        </Block>
        <Text style={styles.dayText}>{this.getShortDay()[d]}</Text>
      </Block>
    )
  };

  renderItem = (item) => {
    const {navigation} = this.props;
    return (
      <TouchableOpacity
        style={[styles.item, {backgroundColor: item.done ? 'grey' : theme.COLORS.PRIMARY}]}
        onPress={() => navigation.navigate('SWorkout', { id: item.id } )}
      >
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <Block style={styles.emptyDate}>
        <Text style={{color: theme.COLORS.MUTED}}>No workouts</Text>
      </Block>
    );
  };

  render() {
    return (
      <Wrap style={{paddingBottom: 30}}>
        <Agenda
          items={this.state.items}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          renderEmptyData = {() => {return (<Block />);}}
          onDayPress={this.loadItems}
          theme={calendarTheme}
          renderDay={this.renderDay}
          hideExtraDays={true}
        />
      </Wrap>
    );
  }
}

const calendarTheme = {
  calendarBackground: theme.COLORS.CARD_BG,
  agendaKnobColor: theme.COLORS.TEXT,
  backgroundColor: theme.COLORS.APP_BG,
  selectedDayBackgroundColor: theme.COLORS.PRIMARY,
  dotColor: theme.COLORS.PRIMARY,
  dayTextColor: theme.COLORS.TEXT,
  monthTextColor: theme.COLORS.PRIMARY,
  indicatorColor: theme.COLORS.PRIMARY,
  textSectionTitleColor: theme.COLORS.TEXT,
  selectedDayTextColor: '#ffffff',
  todayTextColor: theme.COLORS.PRIMARY,
  textDisabledColor: '#d9e1e8',
  selectedDotColor: '#ffffff',
  disabledArrowColor: '#d9e1e8',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.COLORS.CARD_BG,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  itemTitle: {
    color: theme.COLORS.WHITE,
    fontSize: 18
  },
  itemDate: {
    color: theme.COLORS.WHITE,
    fontSize: 14,
    marginTop: 5
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  day: {
    width: 60,
    paddingTop: 25
  },
  dayText: {
    fontWeight: '300',
    color: theme.COLORS.TEXT
  },
  button: {
    marginTop: theme.SIZES.BASE
  }
});

