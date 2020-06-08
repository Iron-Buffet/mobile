import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Block} from 'galio-framework';
import {Button, Text} from './index';
import theme from '../constants/Theme';
import AddExerciseForm from '../components/AddExerciseForm';

const baseExercise = {
  exercise: null,
  sets: '',
  reps: '',
  weight: '',
  style: null,
  notes: null,
};

const CreateWorkoutPart = (props) =>  {

  const [state, setState] = React.useState({
    exercises: [{...baseExercise}],
  });

  React.useEffect(() => {
    const {onPartUpdated, part} = props;
    const {exercises} = state;
    if (part.exercises !== exercises || exercises[0] === baseExercise) {
      onPartUpdated(state.exercises);
    }
  }, [state]);

  const formStateUpdated = (formState, i) => {
    const {exercises} = state;
    const before = exercises.slice(0, i);
    const after = exercises.slice(i + 1);
    setState({
      ...state,
      exercises: [...before, formState, ...after],
    });
  };

  const removeExerciseHandler = i => {
    let exercises = [...state.exercises];
    exercises.splice(i, 1);
    setState({
      ...state,
      exercises,
    });
  };

  const addExerciseHandler = () => {
    const newExercises = state.exercises.concat(baseExercise);
    setState({
      ...state,
      exercises: newExercises,
    });
  };

  const {part} = props;
  const stateExercises = state.exercises;

  return (
    <Block style={styles.workoutCard}>
      <Block style={styles.stretchRow}>
        <Text style={{fontSize: 24}}>{part.name}</Text>
        <Button small onPress={() => addExerciseHandler()}>
          Add Exercise
        </Button>
      </Block>
      {stateExercises.map((se, i) => {
        return (
          <Block key={`ne${i}`} style={{position: 'relative'}}>
            {i > 0 ? (
              <TouchableOpacity
                style={styles.delete}
                onPress={() => removeExerciseHandler(i)}>
                <Text style={styles.del}>&times;</Text>
              </TouchableOpacity>
            ) : null}
            <AddExerciseForm
              onStateUpdate={formState => formStateUpdated(formState, i)}
              part={part}
            />
          </Block>
        );
      })}
    </Block>
  );
};

const styles = StyleSheet.create({
  delete: {
    width: 22,
    height: 22,
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.COLORS.PRIMARY,
    position: 'absolute',
    zIndex: 2,
    top: 5,
    right: -10,
  },
  del: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
    lineHeight: 23,
  },
  stretchRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  workoutCard: {
    marginBottom: theme.SIZES.BASE,
    alignSelf: 'stretch',
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.CARD_BG,
    borderRadius: 5,
    paddingHorizontal: theme.SIZES.BASE,
    shadowColor: theme.COLORS.SHADOW,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 7,
    position: 'relative',
  },
});

export default CreateWorkoutPart;
