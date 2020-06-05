import React from 'react';
import {Block} from 'galio-framework';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {theme} from '../../constants';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Text from '../../components/Text';
import {AuthContext} from '../../context/contexts';

const Drawer = props => {
  const navigation = useNavigation();
  const {user, fbUser} = React.useContext(AuthContext);
  return (
    <Block
      style={styles.container}
      forceInset={{top: 'always', horizontal: 'never'}}>
      {!!user && (
        <Block flex={0.2} style={styles.header} row center>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile')}>
            <Image source={{uri: fbUser && fbUser.avatar ? fbUser.avatar : user.avatar}} style={styles.avatar} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile')}>
            <Block flex>
              <Text numberOfLines={1} h5 color={theme.COLORS.TEXT}>
                {user.name || ''}
              </Text>
              <Text numberOfLines={1} size={16} muted style={styles.seller}>
                {user.email}
              </Text>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      )}
      <Block flex>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.CARD_BG,
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
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 60,
    marginRight: theme.SIZES.BASE,
  },
  seller: {
    marginRight: 16,
    fontWeight: '300',
  },
});

export default Drawer;
