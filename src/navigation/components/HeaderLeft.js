import React from 'react'
import {StyleSheet} from 'react-native'

import {Block} from 'galio-framework'
import {TouchableOpacity} from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { withNavigation } from 'react-navigation';
import {theme} from "../../constants";
import Text from '../../components/Text'

/**
 * Received props:
 * Back - change behavior of nav button
 * Icon - change icon name (available only material icons pack)
 * Title - displays title
 */
class HeaderLeft extends React.Component {

  handleLeftPress = () => {
    const { back, navigation } = this.props;

    return (back ? navigation.goBack() : navigation.openDrawer());
  };

  render () {
    const {title, icon, back} = this.props;
    const colorStyle = {color: back ? theme.COLORS.PRIMARY : theme.COLORS.TEXT};
    return (
      <TouchableOpacity
        onPress={() => this.handleLeftPress()}
      >
        <Block row center>
          <Icon
            style={[styles.icon, colorStyle]}
            name={icon} />
          <Text
            style={[styles.title, colorStyle]}
          >{title}</Text>
        </Block>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    marginRight: 3,
    marginLeft: theme.SIZES.BASE / 2,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
});

export default withNavigation(HeaderLeft)
