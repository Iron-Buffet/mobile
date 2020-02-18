import React from "react";
import {Block} from "galio-framework";
import {Image, ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {theme} from "../../constants";
import {DrawerItems} from "react-navigation-drawer";
import {connect} from 'react-redux';
import Text from '../../components/Text'

class Drawer extends React.Component {
  render() {
    const {navigation, user} = this.props;
    return (
      <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <Block flex={0.2} style={styles.header} row center>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')} >
              <Image source={{ uri: user.avatar}} style={styles.avatar} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')} >
            <Block>
              <Text h5 color="white">{user.name || ''}</Text>
              <Text size={16} muted style={styles.seller}>{user.email}</Text>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
        <Block flex>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <DrawerItems {...this.props} />
          </ScrollView>
        </Block>
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.CARD_BG
  },
  header: {
    backgroundColor: theme.COLORS.CARD_BG,
    paddingHorizontal: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 60,
    marginRight: theme.SIZES.BASE
  },
  seller: {
    marginRight: 16,
    fontWeight: '300'
  }
});

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
};

export default connect(mapStateToProps)(Drawer)
