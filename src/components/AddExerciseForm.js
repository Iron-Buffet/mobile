import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Dimensions, StyleSheet} from 'react-native';
import {Block} from 'galio-framework';
import {Input} from '../components';
import theme from '../constants/Theme';
import {AppContext} from "../context/contexts";

const {width} = Dimensions.get('screen');

const AddExerciseForm = props => {

  const {fitStyles, exercises} = React.useContext(AppContext);

  const [state, setState] = React.useState({
    exercise: null,
    sets: '',
    reps: '',
    weight: '',
    style: null,
    notes: null,
  });

  const updateState = (prop, value) => {
    setState({
      ...state,
      [prop]: value,
    });
  };
  React.useEffect(() => {
    const {onStateUpdate} = props;
    onStateUpdate(state);
  }, [state]);

  const {part} = props;
  const filteredExercises = exercises.filter(e => e.body_part_id === part.id);

  const itemsE = filteredExercises.map(e => {
    return {
      label: e.name,
      value: e.id,
      key: 'exercise' + e.id,
    };
  });
  const itemsS = fitStyles.map(s => {
    return {
      label: s.name,
      value: s.id,
      key: 'style' + s.id,
    };
  });
  return (
    <Block style={styles.formWrap}>
      <Block>
        <RNPickerSelect
          onValueChange={value => updateState('exercise', value)}
          value={state.exercise}
          items={itemsE}
          style={{
            inputIOS: styles.inputIOS,
            placeholder: {
              color: theme.COLORS.TEXT,
            },
          }}
          placeholder={{label: 'Select exercise'}}
        />
        <RNPickerSelect
          onValueChange={value => updateState('style', value)}
          value={state.style}
          items={itemsS}
          style={{
            inputIOS: styles.inputIOS,
            placeholder: {
              color: theme.COLORS.TEXT,
            },
          }}
          placeholder={{label: 'Select style'}}
        />
      </Block>
      <Block style={styles.stretchRow}>
        <Input
          onChangeText={value => updateState('sets', value)}
          style={styles.input}
          placeholder="Sets"
        />
        <Input
          onChangeText={value => updateState('reps', value)}
          style={styles.input}
          placeholder="Reps"
        />
        <Input
          onChangeText={value => updateState('weight', value)}
          style={styles.input}
          placeholder="Weight"
        />
      </Block>
      <Block style={styles.stretchRow}>
        <Input
          onChangeText={value => updateState('notes', value)}
          style={[styles.inputWide]}
          placeholder="Notes"
        />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  stretchRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  inputIOS: {
    color: theme.COLORS.TEXT,
    borderColor: theme.COLORS.TEXT,
    borderWidth: 1,
    marginVertical: theme.SIZES.BASE / 2,
    paddingVertical: theme.SIZES.BASE / 2,
    borderRadius: 4,
    textAlign: 'center',
  },
  input: {
    width: (width - 30) / 4,
    height: 30,
  },
  inputWide: {
    alignSelf: 'stretch',
    width: width - 102,
    height: 30,
  },
  formWrap: {
    borderColor: theme.COLORS.TEXT,
    borderWidth: 1,
    padding: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE,
  },
});

export default AddExerciseForm;
