import React from 'react'
import {StyleSheet} from 'react-native'

import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Block } from 'galio-framework';
import { Text } from "../../components";
import { withNavigation } from 'react-navigation';
import {theme} from "../../constants";

class ProfileHeaderRight extends React.Component {
  state = {
    isMenuVisible: false,
  };

  render() {
    const {navigation} = this.props;
    const menuDisplay = this.state.isMenuVisible ? 'flex' : 'none';
    return (
      <Block style={{position: 'relative'}}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isMenuVisible: !this.state.isMenuVisible
            })
          }}>
          <Icon
            name="more-vert"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Block style={[styles.menu, {display: menuDisplay}]}>
          <TouchableOpacity onPress={() => {
            this.setState({
              isMenuVisible: false
            }, () => navigation.navigate('ChangePassword'))
          }} style={styles.item}>
            <Text>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({
              isMenuVisible: false
            }, () => navigation.navigate('BillingInformation'))
          }} style={styles.item}>
            <Text>Billing information</Text>
          </TouchableOpacity>
        </Block>
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
  menu: {
    position: 'absolute',
    top: '120%',
    right: theme.SIZES.BASE,
    width: 170,
    backgroundColor: theme.COLORS.APP_BG,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE * 0.75,
    shadowColor: theme.COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 4,
  },
  item: {
    paddingVertical: theme.SIZES.BASE / 4
  }
});

export default withNavigation(ProfileHeaderRight)
