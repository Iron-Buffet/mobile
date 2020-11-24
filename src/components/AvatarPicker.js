import React from 'react';
import {Block} from 'galio-framework';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../constants';
import ImagePicker from 'react-native-image-crop-picker';
import {Text} from "./index";

const AvatarPicker = ({onAvatarPicked, avatar}) => {

  const pickAvatarHandler = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      onAvatarPicked(image.path);
    })
      .catch(e => {
        alert(e)
      });
  };
  return (
    <TouchableOpacity onPress={pickAvatarHandler}>
      <Block center middle>
        {avatar ? <Image source={{uri: avatar}} style={styles.avatar} /> : <Block center middle style={styles.avatarPlaceholder}><Text size={32} color={`white`}>+</Text></Block>}
      </Block>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  avatarPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: theme.COLORS.MUTED,
    borderRadius: 35,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default AvatarPicker;
