import React from 'react'
import {StyleSheet} from 'react-native'

import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Block } from "galio-framework";
import { withNavigation } from 'react-navigation';
import {theme} from "../../constants";

class ProfileHeaderRight extends React.Component {
  render() {
    const {navigation} = this.props;

    return (
      <Block row>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon
            name="edit"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
          <Icon
            name="power-settings-new"
            style={[styles.icon, {color: theme.COLORS.PRIMARY}]}
          />
        </TouchableOpacity>
      </Block>
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
});

export default withNavigation(ProfileHeaderRight)
