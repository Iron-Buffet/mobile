import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {theme} from '../constants';
import {formatAMPM} from '../utils/methods';

export default function Message({ownAvatar, rightAvatar, item, side}) {
  const isLeftSide = side === 'left';

  const containerStyles = isLeftSide
    ? styles.container
    : flattenedStyles.container;
  const textContainerStyles = isLeftSide
    ? styles.textContainer
    : flattenedStyles.textContainer;
  const textStyles = isLeftSide
    ? flattenedStyles.leftText
    : flattenedStyles.rightText;
  const dateStyles = isLeftSide
    ? flattenedStyles.leftDate
    : flattenedStyles.rightDate;
  return (

    <View style={containerStyles}>
      {!isLeftSide && !!ownAvatar && <Image source={{uri: ownAvatar}} style={[styles.avatar, {marginRight: 10}]} />}
      <View style={textContainerStyles}>
        <Text style={[textStyles, {marginBottom: 5}]}>
          {item.user_name || ''}
        </Text>
        <Text style={dateStyles}>
          {formatAMPM(item.created_at)}
        </Text>
        <Text style={textStyles}>{item.message}</Text>
      </View>
      {isLeftSide && !!rightAvatar && <Image source={{uri: rightAvatar}} style={[styles.avatar, {marginLeft: 10}]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    width: 260,
    backgroundColor: '#555',
    position: 'relative',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingRight: 50,
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
  rightTextContainer: {
    backgroundColor: theme.COLORS.PRIMARY,
    paddingLeft: 55,
    paddingRight: 15,
  },
  leftText: {
    textAlign: 'left',
  },
  rightText: {
    textAlign: 'right',
  },
  text: {
    fontSize: 14,
    color: 'white',
  },
  leftDate: {
    position: 'absolute',
    right: 10,
  },
  rightDate: {
    position: 'absolute',
    left: 10,
  },
  dateText: {
    color: 'white',
    bottom: 10,
  },
  avatar: {
    alignSelf: 'flex-end',
    width: 40,
    height: 40,
    borderRadius: 25,
  }
});

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([
    styles.textContainer,
    styles.rightTextContainer,
  ]),
  leftText: StyleSheet.flatten([styles.leftText, styles.text]),
  leftDate: StyleSheet.flatten([styles.leftDate, styles.dateText]),
  rightText: StyleSheet.flatten([styles.rightText, styles.text]),
  rightDate: StyleSheet.flatten([styles.rightDate, styles.dateText]),
};
