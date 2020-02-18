import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import theme from '../../constants/Theme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation';

class CalendarHeaderRight extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AddToCalendar')}>
        <Icon name="add" style={styles.icon} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    color: theme.COLORS.PRIMARY,
    fontSize: 24,
    marginRight: theme.SIZES.BASE / 2,
  }
});

export default withNavigation(CalendarHeaderRight)
