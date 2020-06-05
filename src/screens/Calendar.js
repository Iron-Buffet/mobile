import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Block} from 'galio-framework';
import theme from '../constants/Theme';
import XDate from 'xdate';
import {getShortDay, getShortMonth} from '../utils/methods';

import {Agenda} from 'react-native-calendars';
import {$get} from '../utils/Fetch';

import {Text, Wrap} from '../components';

const Calendar = ({navigation}) => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const date = {};
    date.timestamp = new Date().getTime();
    loadItems(date);
    //eslint-disable-next-line
  }, []);

  const loadItems = day => {
    $get('/workout/events-mobile?time=' + day.timestamp).then(res => {
      setItems(res);
    });
  };

  const renderDay = day => {
    if (!day) {
      return <Block center style={styles.day} />;
    }
    const xDate = new XDate(day.timestamp, true);
    const d = xDate.getDay();
    const date = xDate.getDate();
    const month = xDate.getMonth();
    return (
      <Block center style={styles.day}>
        <Block row>
          <Text style={styles.dayText}>{getShortMonth()[month]}</Text>
          <Text style={styles.dayText}> {date}</Text>
        </Block>
        <Text style={styles.dayText}>{getShortDay()[d]}</Text>
      </Block>
    );
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {backgroundColor: item.done ? 'grey' : theme.COLORS.PRIMARY},
        ]}
        onPress={() => navigation.navigate('SWorkout', {id: item.id})}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <Block style={styles.emptyDate}>
        <Text style={{color: theme.COLORS.MUTED}}>No workouts</Text>
      </Block>
    );
  };

  return (
    <Wrap style={{paddingBottom: 30}}>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={() => <Block />}
        onDayPress={loadItems}
        theme={calendarTheme}
        renderDay={renderDay}
        hideExtraDays={true}
      />
    </Wrap>
  );
};

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
    marginTop: 17,
  },
  itemTitle: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
  },
  itemDate: {
    color: theme.COLORS.WHITE,
    fontSize: 14,
    marginTop: 5,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  day: {
    width: 60,
    paddingTop: 25,
  },
  dayText: {
    fontWeight: '300',
    color: theme.COLORS.TEXT,
  },
  button: {
    marginTop: theme.SIZES.BASE,
  },
});

export default Calendar;
