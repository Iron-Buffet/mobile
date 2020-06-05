import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Slider} from 'galio-framework';
import CreateWorkoutPart from '../components/CreateWorkoutPart';
import {Rating} from 'react-native-ratings';

import {Button, Input, Text, Wrap, Checkbox} from '../components';
import {Block} from 'galio-framework';
import theme from '../constants/Theme';
import PARTS from '../constants/Parts';
import {$post} from '../utils/Fetch';
import {LINKS} from '../constants';

const baseExercise = {
  exercise: null,
  sets: '',
  reps: '',
  weight: '',
  style: null,
  notes: null,
};

const CreateWorkout = ({navigation}) => {
  const [state, setState] = React.useState({
    newDate: new Date(),
    workout: {
      parts: [],
      name: '',
      difficulty: 1,
      timing: 5,
      description: '',
    },
    stepOne: true,
  });

  const toggleSwitchHandler = part => {
    const {workout} = state;
    const index = workout.parts.findIndex(p => p.id === part.id);
    if (index !== -1) {
      let arr = workout.parts.filter(el => el.id !== part.id);
      setState({
        ...state,
        workout: {
          ...workout,
          parts: arr,
        },
      });
    } else {
      setState({
        ...state,
        workout: {
          ...workout,
          parts: [
            ...workout.parts,
            {
              id: part.id,
              name: part.name,
              exercises: [baseExercise],
            },
          ],
        },
      });
    }
  };
  const savePressHandler = () => {
    const {workout, stepOne} = state;
    if (stepOne) {
      setState({
        ...state,
        stepOne: false,
      });
    } else {
      if (workout.parts.length === 0) {
        alert('Select at least one body part');
        return false;
      }
      const data = new FormData();
      data.append('workout', JSON.stringify(workout));
      $post(LINKS.WORKOUT_CREATE, {body: data}).then(res => {
        navigation.navigate('WorkoutManagement', {
          screen: 'WMWorkout',
          params: {id: res},
        });
        //TODO Check "WMWorkout" Props from MainNav
      });
    }
  };

  const setWorkoutName = name => {
    const workout = {...state.workout};
    workout.name = name;
    setState({
      ...state,
      workout,
    });
  };

  const setWorkoutDescription = text => {
    const workout = {...state.workout};
    workout.description = text;
    setState({
      ...state,
      workout,
    });
  };

  const partDidUpdate = (exercises, partId) => {
    const workout = {...state.workout};
    const part = workout.parts.find(p => p.id === partId);
    const partIndex = workout.parts.findIndex(p => p.id === partId);
    part.exercises = exercises;
    const before = workout.parts.slice(0, partIndex);
    const after = workout.parts.slice(partIndex + 1);
    const parts = [...before, part, ...after];
    const stateWorkout = state.workout;
    setState({
      ...state,
      workout: {
        ...stateWorkout,
        parts,
      },
    });
  };

  const timingSetHandler = timing => {
    const workout = {...state.workout};
    workout.timing = timing;
    setState({
      ...state,
      workout,
    });
  };

  const difficultySetHandler = difficulty => {
    const workout = {...state.workout};
    workout.difficulty = difficulty;
    setState({
      ...state,
      workout,
    });
  };

  const renderSwitchers = () => {
    const {workout} = state;

    return PARTS.map(p => {
      const val = workout.parts.findIndex(part => part.id === p.id) !== -1;
      return (
        <Block row key={`part${p.id}`} style={styles.switchWrap}>
          <Checkbox
            value={val}
            onPress={() => toggleSwitchHandler(p)}
            text={p.name}
            full
          />
        </Block>
      );
    });
  };

  const cancelPressHandler = () => {
    const {stepOne} = state;

    return stepOne ? navigation.goBack() : setState({...state, stepOne: true});
  };

  const {workout, stepOne} = state;

  return (
    <Wrap>
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>
          {stepOne ? (
            <Block>
              <Block style={styles.switchersContainer}>
                {renderSwitchers()}
              </Block>
              {workout.parts.map(part => {
                return (
                  <CreateWorkoutPart
                    onPartUpdated={e => partDidUpdate(e, part.id)}
                    key={`cwp${part.id}`}
                    part={part}
                  />
                );
              })}
            </Block>
          ) : (
            <Block>
              <Input
                placeholder="Workout Name"
                style={{marginBottom: theme.SIZES.BASE * 1.25}}
                onChangeText={name => setWorkoutName(name)}
              />
              <Block row style={styles.centerRow}>
                <Text>Difficulty: </Text>
                <Rating
                  onFinishRating={difficultySetHandler}
                  ratingColor={theme.COLORS.PRIMARY}
                  imageSize={20}
                  ratingTextColor={theme.COLORS.PRIMARY}
                  startingValue={state.workout.difficulty}
                  tintColor={theme.COLORS.starsBg}
                />
              </Block>
              <Block row style={styles.centerRow}>
                <Text>Timing: </Text>
                <Block flex>
                  <Slider
                    maximumValue={15}
                    activeColor={theme.COLORS.PRIMARY}
                    value={state.workout.timing}
                    step={1}
                    thumbStyle={{
                      borderColor: theme.COLORS.PRIMARY,
                    }}
                    onSlidingComplete={timingSetHandler}
                  />
                </Block>
                <Text style={{marginLeft: 5}}>{state.workout.timing} min.</Text>
              </Block>
              <Input
                multiline={true}
                textarea
                numberOfLines={4}
                placeholder="Description"
                onChangeText={text => setWorkoutDescription(text)}
                value={workout.description}
              />
            </Block>
          )}
        </ScrollView>
      </Block>
      <Block
        row
        space="between"
        style={{marginBottom: 30, alignSelf: 'stretch'}}>
        <Button small back onPress={cancelPressHandler}>
          {stepOne ? 'Cancel' : 'Back'}
        </Button>
        <Button
          onPress={savePressHandler}
          style={{marginLeft: 'auto', width: 100}}>
          {stepOne ? 'Next' : 'Save'}
        </Button>
      </Block>
    </Wrap>
  );
};

const styles = StyleSheet.create({
  switchWrap: {
    marginBottom: theme.SIZES.BASE / 2,
    marginRight: theme.SIZES.BASE / 2,
    width: 120,
    alignItems: 'center',
  },
  switchersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  stretchRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: theme.SIZES.BASE * 1.25,
  },
  date: {
    zIndex: 30,
    color: theme.COLORS.TEXT,
    position: 'relative',
  },
});

export default CreateWorkout;
