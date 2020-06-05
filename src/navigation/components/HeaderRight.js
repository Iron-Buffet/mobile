import React from 'react';
import {StyleSheet} from 'react-native';

import {Block} from 'galio-framework';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {theme} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const HeaderRight = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
      <Block row center>
        <Icon style={styles.icon} name="chat" />
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    marginRight: theme.SIZES.BASE / 2,
    color: theme.COLORS.PRIMARY,
  },
});

export default HeaderRight;
