import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Block} from 'galio-framework';
import RNPickerSelect from 'react-native-picker-select';
import {utils, theme} from '../constants';
import {Input, Text, Wrap} from '../components';
import {cardInput} from '../utils/globalStyles';

export default class BillingInformation extends React.Component {
  state = {
    cardNumber: null,
    month: null,
    year: null,
    cvv: null,
  };

  render() {
    return (
      <Wrap>
        <Block>
          <TextInputMask
            type={'credit-card'}
            style={styles.cardInput}
            placeholderTextColor={theme.COLORS.TEXT}
            placeholder="Card Number"
            value={this.state.cardNumber}
            onChangeText={cardNumber => {
              this.setState({cardNumber});
            }}
          />
          <Block row space="between">
            <Block row bottom>
              <RNPickerSelect
                onValueChange={month => {
                  this.setState({month});
                }}
                value={this.state.month}
                placeholder={{label: ''}}
                items={utils.months}
                style={{
                  inputIOS: [
                    styles.cardInput,
                    {width: 40, paddingHorizontal: 5},
                  ],
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontFamily: theme.FONT_FAMILY.LIGHT,
                }}>
                /
              </Text>
              <RNPickerSelect
                onValueChange={year => {
                  this.setState({year});
                }}
                value={this.state.year}
                items={utils.years}
                placeholder={{label: ''}}
                style={{
                  inputIOS: [
                    styles.cardInput,
                    {width: 60, paddingHorizontal: 5},
                  ],
                }}
              />
            </Block>
            <Input
              placeholder="CVV"
              password
              maxLength={3}
              keyboardType="numeric"
              onChangeText={cvv => this.setState({cvv})}
              style={[styles.cardInput, {width: 150, paddingHorizontal: 5}]}
            />
          </Block>
        </Block>
      </Wrap>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.SIZES.BASE,
    alignItems: 'stretch',
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.APP_BG,
    alignItems: 'stretch',
  },
  btn: {
    width: 100,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  date: {
    zIndex: 30,
    color: theme.COLORS.TEXT,
  },
  selectBtn: {
    backgroundColor: theme.COLORS.PRIMARY,
    marginBottom: theme.SIZES.BASE,
    shadowColor: 'transparent',
  },
  listItem: {
    marginVertical: 10,
  },
  cardInput,
});
