import React from 'react';
import {Block} from 'galio-framework';
import {Text} from './index';
import {StyleSheet} from 'react-native';
import {Checkbox} from './index';

const YNCheckbox = ({onPress, placeholder, value}) => {
  return (
    <Block>
      <Text subtitle>{placeholder}</Text>
      <Block row style={styles.mb16}>
        <Block style={styles.mr16}>
          <Checkbox
            onPress={() => onPress(0)}
            value={!value}
            text='No'
          />
        </Block>
        <Checkbox
          onPress={() => onPress(1)}
          value={!!value}
          text='Yes'
        />
      </Block>
    </Block>
  )
};

const styles = StyleSheet.create({
  mr16: {
    marginRight: 16,
  },
  mb16: {
    marginBottom: 16,
  },
});

export default YNCheckbox;
