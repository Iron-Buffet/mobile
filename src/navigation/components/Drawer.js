import React from 'react'
import {Block} from 'galio-framework'
import {Alert, Image, Linking, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {theme} from '../../constants'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import {useNavigation} from '@react-navigation/native'
import Text from '../../components/Text'
import {AuthContext} from '../../context/contexts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Drawer = props => {
  const navigation = useNavigation()
  const { user, fbUser } = React.useContext(AuthContext)
  const handlePress = async url => {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`)
    }
  }
  const handlePressNutrition = async () => {
    const url = 'mynutritionapp://'
    if (await Linking.canOpenURL(url)) {
      try {
        await Linking.openURL(url)
      } catch (e) {
        console.log(e)
      }
    } else {
      const appstoreWeb = 'https://apps.apple.com/us/app/id1530262458'
      if (await Linking.canOpenURL(appstoreWeb)) {
        await Linking.openURL(appstoreWeb)
      }
    }
  }
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      {!!user && (
        <Block flex={0.2} style={styles.header} row center>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: fbUser && fbUser.avatar ? fbUser.avatar : user.avatar }} style={styles.avatar} />
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
        <Block flex={5}>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </Block>
        <Block flex={2}>
          <TouchableWithoutFeedback onPress={handlePressNutrition}>
            <Block style={styles.nutriBtn}>
              <Icon style={styles.ion} size={22} color={theme.COLORS.TEXT} name={'favorite'} /><Text style={{ fontSize: 16 }}>MY NUTRITION</Text>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
        <Block style={styles.social} row>
          <TouchableWithoutFeedback onPress={() => handlePress('https://www.instagram.com/ironbuffet/')}>
            <Ionicons name={`logo-instagram`} size={30} color={theme.COLORS.TEXT} />
          </TouchableWithoutFeedback>
          <Block style={styles.center}>
            <TouchableWithoutFeedback onPress={() => handlePress('https://facebook.com/ironbuffet')}>
              <Ionicons name={`logo-facebook`} size={30} color={theme.COLORS.TEXT} />
            </TouchableWithoutFeedback>
          </Block>
          <TouchableWithoutFeedback onPress={() => handlePress('https://facebook.com/groups/ironbuffet')}>
            <Block center row>
              <Ionicons name={`logo-facebook`} size={30} color={theme.COLORS.TEXT} />
              <Block style={styles.gr}>
                <Text color={`white`} size={10}>GROUP</Text>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      </Block>
    </Block>
  )
}
const styles = StyleSheet.create({
  nutriBtn: {
    marginHorizontal: 15,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ion: {
    marginRight: 12
  },
  social: {
    marginBottom: 40,
    justifyContent: 'center'
  },
  center: {
    marginHorizontal: theme.SIZES.BASE
  },
  gr: {
    backgroundColor: theme.COLORS.PRIMARY,
    borderRadius: 5,
    paddingHorizontal: 3,
    marginLeft: 3,
    marginTop: 15
  },
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
    alignSelf: 'stretch'
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
})
export default Drawer
