import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const CalendarHeaderRight = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('AddToCalendar')}>
      <Icon name="add" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: theme.COLORS.PRIMARY,
    fontSize: 24,
    marginRight: theme.SIZES.BASE / 2,
  },
});

export default CalendarHeaderRight;
