import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Dimensions, StyleSheet} from 'react-native';
import {Block} from 'galio-framework';
import {Input} from '../components';
import {connect} from 'react-redux';
import theme from '../constants/Theme';

const {width} = Dimensions.get('screen');

class AddExerciseForm extends React.Component {
  state = {
    exercise: null,
    sets: '',
    reps: '',
    weight: '',
    style: null,
    notes: null,
  };

  updateState = (prop, value) => {
    const {onStateUpdate} = this.props;
    this.setState(
      {
        [prop]: value,
      },
      () => {
        onStateUpdate(this.state);
      },
    );
  };

  render() {
    const {exercises, part, exStyles} = this.props;
    const filteredExercises = exercises.filter(e => e.body_part_id === part.id);

    const itemsE = filteredExercises.map(e => {
      return {
        label: e.name,
        value: e.id,
        key: 'exercise' + e.id,
      };
    });
    const itemsS = exStyles.map(s => {
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
            onValueChange={value => this.updateState('exercise', value)}
            value={this.state.exercise}
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
            onValueChange={value => this.updateState('style', value)}
            value={this.state.style}
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
            onChangeText={value => this.updateState('sets', value)}
            style={styles.input}
            placeholder="Sets"
          />
          <Input
            onChangeText={value => this.updateState('reps', value)}
            style={styles.input}
            placeholder="Reps"
          />
          <Input
            onChangeText={value => this.updateState('weight', value)}
            style={styles.input}
            placeholder="Weight"
          />
        </Block>
        <Block style={styles.stretchRow}>
          <Input
            onChangeText={value => this.updateState('notes', value)}
            style={[styles.inputWide]}
            placeholder="Notes"
          />
        </Block>
      </Block>
    );
  }
}

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

const mapStateToProps = state => {
  return {
    exercises: state.exercisesReducer.exercises,
    exStyles: state.stylesReducer.styles,
  };
};

export default connect(mapStateToProps)(AddExerciseForm);
