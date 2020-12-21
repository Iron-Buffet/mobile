import React, {useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Block} from 'galio-framework';
import {AvatarPicker, Input, Text} from '../index';
import theme from '../../constants/Theme';
import {age} from '../../utils/methods';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const MainInfo = ({
                    state,
                    handleAvatarPicked,
                    handleSetPassword,
                    handleSetFirstName,
                    handleSetLastName,
                    handleSetPhone,
                    handleSetDate,
                    handleAcceptTerms,
                  }) => {

  const [datePicker, setDatePicker] = useState(false);

  const handleConfirm = date => {
    handleSetDate(date);
    setDatePicker(false);
  };

  return (
    <Block>
      <Block center>
        <Text title style={styles.mb0}>
          Registration
        </Text>
        <Text size={18}>{state.email}</Text>
        <Block style={{marginTop: 10}}>
          <AvatarPicker
            avatar={state.avatar}
            onAvatarPicked={handleAvatarPicked}/>
        </Block>
      </Block>
      <Block>
        <Input
          placeholder="Password"
          password
          value={state.password}
          onChangeText={handleSetPassword}
        />
        <Input
          placeholder="First Name"
          value={state.firstName}
          onChangeText={handleSetFirstName}
        />
        <Input
          placeholder="Last Name"
          value={state.lastName}
          onChangeText={handleSetLastName}
        />
        <Input
          placeholder="Phone Number"
          value={state.phone}
          keyboardType="phone-pad"
          onChangeText={handleSetPhone}
        />
        <Block style={{position: 'relative'}}>
          <TouchableWithoutFeedback
            onPress={() => setDatePicker(true)}>
            <Block style={styles.inputOverflow}/>
          </TouchableWithoutFeedback>
          <Input
            placeholder="Date of Birth"
            editable={false}
            value={state.date.toLocaleDateString() + ' (' + age(state.date) + ' y.o.)'}
          />
        </Block>
        <Block style={styles.terms}>
          <TouchableOpacity
            onPress={() => handleAcceptTerms(true)}>
            <Block style={styles.checkBorder}>
              {state.terms && <Block style={styles.check}/>}
            </Block>
          </TouchableOpacity>
          <Text style={{fontSize: theme.SIZES.BASE * 0.8}}>
            By checking this box I agree on{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('https://ironbuffet.com/terms-of-use')
              }>
              Terms & Conditions
            </Text>{' '}
            &{' '}
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('https://ironbuffet.com/privacy-policy')
              }>
              Privacy&nbsp;Policy
            </Text>
          </Text>
        </Block>
        <Text style={styles.info}>
          By participating, you consent to receive text and emails messages
          sent by an automatic telephone dialing system. Consent to these
          terms is not a condition of purchase. Message and data rates may
          apply.
        </Text>
      </Block>
      <DateTimePickerModal
        isVisible={datePicker}
        mode="date"
        onConfirm={handleConfirm}
        isDarkModeEnabled={theme.IS_DARK}
        onCancel={() => setDatePicker(false)}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: theme.COLORS.TEXT,
  },
  info: {
    fontSize: 10,
    marginTop: theme.SIZES.BASE,
  },
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
  terms: {
    marginTop: theme.SIZES.BASE,
    flexDirection: 'row',
  },
  inputOverflow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
});

export default MainInfo;
