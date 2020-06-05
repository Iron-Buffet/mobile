import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  View,
} from 'react-native';
import {theme} from '../constants';
const {width} = Dimensions.get('screen');

const KeyboardView = ({children}) => {
  const [bot, setBot] = React.useState(0);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };


  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = e => {
    setBot(e.endCoordinates.height);
  };

  const _keyboardDidHide = () => {
    setBot(0);
  };
  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View
        style={{
          width,
          marginLeft: -theme.SIZES.BASE / 2,
          flex: 1,
          bottom: bot,
        }}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardView;
