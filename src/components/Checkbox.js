import React from 'react';
import {Block} from 'galio-framework';
import {Text} from '../components';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../constants';

const Checkbox = ({full, value, text, onPress}) => {

  if (full === undefined) {
    full = true
  }
  if (full) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Block style={styles.checkWrap}>
          <Block style={styles.checkBorder}>
            {value && <Block style={styles.check} />}
          </Block>
          <Text>{text}</Text>
        </Block>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <Block style={styles.checkWrap}>
      <TouchableOpacity onPress={onPress}>
        <Block style={styles.checkBorder}>
          {value && <Block style={styles.check} />}
        </Block>
      </TouchableOpacity>
      <Text>{text}</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  checkBorder: {
    borderRadius: 3,
    borderWidth: 2,
    borderColor: theme.COLORS.MUTED,
    width: 20,
    height: 20,
    position: 'relative',
    marginRight: theme.SIZES.BASE / 2,
  },
  check: {
    width: 20,
    height: 10,
    borderColor: theme.COLORS.PRIMARY,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    position: 'absolute',
    top: -3,
    left: 2,
    transform: [{rotate: '-45deg'}],
  },
  checkWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Checkbox;
