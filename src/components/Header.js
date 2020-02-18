import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Block, Text } from 'galio-framework';
import MIcon from 'react-native-vector-icons/MaterialIcons';


import theme from '../constants/Theme';

const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;

    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  renderLeft = () => {
    const {back, title} = this.props;

    return(
      <TouchableOpacity
        style={styles.button}
        onPress={this.handleLeftPress}
      >
        <Block row center>
          <MIcon
            name={back ? 'navigate-before' : 'menu'}
            style={styles.navIcon}
          />
          <Text style={styles.title}>{title}</Text>
        </Block>
      </TouchableOpacity>

    )
}



  render() {
    const { transparent, navigation } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Workouts'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      { backgroundColor: transparent ? 'rgba(0,0,0,0)' : theme.COLORS.DARK },
    ];

    return (
      <Block style={headerStyles}>
        <Block row style={styles.navbar}>
          {this.renderLeft()}
        </Block>
      </Block>
    );
  }
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  navIcon: {
    fontSize: 24,
    color: theme.COLORS.TEXT,
    marginRight: 10
  },
  button: {
    padding: 15,
    position: 'relative',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.COLORS.TEXT
  },
  navbar: {
    paddingBottom: theme.SIZES.BASE / 3,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 3 : theme.SIZES.BASE,
    zIndex: 5,
    backgroundColor: theme.COLORS.DARK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: theme.COLORS.TEXT
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: theme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: theme.COLORS.DARK,
    borderRightColor: theme.COLORS.MUTED,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300',
    color: theme.COLORS.TEXT
  },
  tabIcon: {
    paddingRight: 8,
    color: theme.COLORS.TEXT
  }
})
