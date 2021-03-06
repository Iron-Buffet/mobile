import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, Alert} from 'react-native';
import {Block} from 'galio-framework';
import theme from '../constants/Theme';
import XDate from 'xdate';
import {getShortDay, getShortMonth} from '../utils/methods';
import {useFocusEffect} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Agenda} from 'react-native-calendars';
import {$get} from '../utils/Fetch';

import {Text, Wrap} from '../components';

const Calendar = ({navigation}) => {
  const [state, setState] = React.useState({
    items: [],
    timestamp: null
  });
  const calendar = React.useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      const date = {};
      date.timestamp = new Date().getTime();
      loadItems(date);

      return () => {
        setState(prev => ({
          ...prev,
          timestamp: null,
        }));
      }
    }, [])
  );

  const loadItems = day => {
    setState(prev => ({
      ...prev,
      timestamp: day.timestamp,
    }));
    $get('/workout/events-mobile?time=' + day.timestamp).then(res => {
      setState(prev => ({
        ...prev,
        items: res,
      }));
    });
  };

  const confirmDeleteEvent = id => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => deleteEvent(id) }
      ]
      )
  };

  const deleteEvent = async id => {
    try {
      await $get('/workout/delete-event?id=' + id);
      let containerKey;
      let index;
      for (const key in state.items) {
        const idx = state.items[key].findIndex(e => e.id === id);
        if (idx !== -1) {
          index = idx;
          containerKey = key;
        }
      }
      let old = {...state.items};
      old[containerKey].splice(index, 1);
      setState(prev => ({
        ...prev,
        items: old,
      }));
      alert('Workout deleted.');
    } catch (e) {
      alert(e.message)
    }
  };

  const renderDay = day => {
    if (!day) {
      return <Block center style={styles.day}/>;
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
        <Block flex row>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SWorkout', {
              id: item.workout_id,
              from: 'calendar',
              eventId: item.id,
            })}>
          <Block style={[
            styles.item,
            {backgroundColor: item.done ? 'grey' : theme.COLORS.PRIMARY},
          ]}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text color={'white'}>{item.description}</Text>
          </Block>
          </TouchableWithoutFeedback>
          <Block style={styles.standaloneRowBack}>
            <TouchableWithoutFeedback onPress={() => confirmDeleteEvent(item.id)}>
              <Block style={styles.deleteButton}>
                <Ionicons name={`ios-trash`} color={theme.COLORS.PRIMARY} size={24} />
              </Block>
            </TouchableWithoutFeedback>
          </Block>
        </Block>
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
      {!!state.timestamp && <Agenda
        current={state.timestamp}
        ref={calendar}
        items={state.items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        renderEmptyData={() => <Block/>}
        onDayPress={loadItems}
        theme={calendarTheme}
        renderDay={renderDay}
        hideExtraDays={true}
      />}
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
    marginTop: 10,
  },
  deleteButton: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  standaloneRowBack: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
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


