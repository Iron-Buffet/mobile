import React from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import { connect } from 'react-redux';
import { Slider } from 'galio-framework';
import CreateWorkoutPart from '../components/CreateWorkoutPart'
import { Rating } from 'react-native-ratings';

import {Button, Input, Text, Wrap, Checkbox} from '../components';
import { Block } from 'galio-framework';
import theme from '../constants/Theme'
import PARTS from '../constants/Parts';
import { $post } from '../utils/Fetch'
import {LINKS} from '../constants';

const baseExercise = {
  exercise: null,
  sets: '',
  reps: '',
  weight: '',
  style: null,
  notes: null
};

class CreateWorkout extends React.Component{

  state = {
    newDate: new Date(),
    workout: {
      parts: [],
      name: '',
      difficulty: 1,
      timing: 5,
      description: ''
    },
    stepOne: true
  };

  toggleSwitchHandler = (part) => {
    const {workout} = this.state;
    const index = workout.parts.findIndex(p => p.id === part.id);
    if (index !== -1) {
      let arr = workout.parts.filter(el => el.id !== part.id);
      this.setState({
        workout: {
          ...workout,
          parts: arr,
        }
      })
    } else {
      this.setState({
        workout: {
          ...workout,
          parts: [
            ...workout.parts,
            {
              id: part.id,
              name: part.name,
              exercises: [baseExercise]
            }],
        }
      })
    }
  };
  savePressHandler = () => {
    const {workout, stepOne} = this.state;
    const {navigation} = this.props;
    if (stepOne) {
      this.setState({
        stepOne: false
      })
    } else {
      if (workout.parts.length === 0) {
        alert('Select at least one body part');
        return false;
      }
      const data = new FormData;
      data.append('workout', JSON.stringify(workout));
      $post(LINKS.WORKOUT_CREATE, {body: data}).then(res => {
        navigation.navigate("WMWorkout", {id: res})
        //TODO Check "WMWorkout" Props from MainNav
      });
    }
  };

  setWorkoutName = (name) => {
    const workout = {...this.state.workout};
    workout.name = name;
    this.setState({
      workout,
    })
  };

  setWorkoutDescription = (text) => {
    const workout = {...this.state.workout};
    workout.description = text;
    this.setState({
      workout,
    })
  };

  partDidUpdate = (exercises, partId) => {
    const workout = {...this.state.workout};
    const part = workout.parts.find(p => p.id === partId);
    const partIndex = workout.parts.findIndex(p => p.id === partId);
    part.exercises = exercises;
    const before = workout.parts.slice(0, partIndex);
    const after = workout.parts.slice(partIndex + 1);
    const parts = [
      ...before,
      part,
      ...after
    ];
    const stateWorkout = this.state.workout;
    this.setState({
      workout: {
        ...stateWorkout,
        parts,
      }
    })
  };

  timingSetHandler = (timing) => {
    const workout = {...this.state.workout};
    workout.timing = timing;
    this.setState({
      workout,
    });
  };

  difficultySetHandler = (difficulty) => {
    const workout = {...this.state.workout};
    workout.difficulty = difficulty;
    this.setState({
      workout,
    });
  };

  renderSwitchers = () => {
    const {workout} = this.state;

    return PARTS.map(p => {
      const val = workout.parts.findIndex(part => part.id === p.id) !== -1;
      return (
        <Block
          row
          key={`part${p.id}`}
          style={styles.switchWrap}>
          <Checkbox
            value={val}
            onPress={() => this.toggleSwitchHandler(p)}
            text={p.name}
            full
          />
        </Block>
      )
    })
  };

  cancelPressHandler = () => {
    const { navigation } = this.props;
    const { stepOne } = this.state;

    return (stepOne ? navigation.goBack() : this.setState({stepOne: true}))
  };

  render() {
    const {workout, stepOne} = this.state;

    return (
      <Wrap>
        <Block flex>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              stepOne ? (<Block>
                <Block style={styles.switchersContainer}>
                  {this.renderSwitchers()}
                </Block>
                {
                  workout.parts.map(part => {
                    return (
                      <CreateWorkoutPart
                        onPartUpdated={e => this.partDidUpdate(e, part.id)}
                        key={`cwp${part.id}`}
                        part={part} />
                    )
                  })
                }
              </Block>) : (
                <Block>
                  <Input
                    placeholder="Workout Name"
                    style={{marginBottom: theme.SIZES.BASE * 1.25}}
                    onChangeText={(name) => this.setWorkoutName(name)}
                  />
                  <Block row style={styles.centerRow}>
                    <Text>Difficulty: </Text>
                    <Rating
                      onFinishRating={this.difficultySetHandler}
                      ratingColor={theme.COLORS.PRIMARY}
                      imageSize={20}
                      ratingTextColor={theme.COLORS.PRIMARY}
                      startingValue={this.state.workout.difficulty}
                      tintColor={theme.COLORS.starsBg}
                    />
                  </Block>
                  <Block row style={styles.centerRow}>
                    <Text>Timing: </Text>
                    <Block flex>
                      <Slider
                        maximumValue={15}
                        activeColor={theme.COLORS.PRIMARY}
                        value={this.state.workout.timing}
                        step={1}
                        thumbStyle={{
                          borderColor: theme.COLORS.PRIMARY
                        }}
                        onSlidingComplete={this.timingSetHandler}
                      />
                    </Block>
                    <Text style={{marginLeft: 5}}>
                      {this.state.workout.timing} min.
                    </Text>
                  </Block>
                  <Input
                    multiline={true}
                    textarea
                    numberOfLines={4}
                    placeholder="Description"
                    onChangeText={(text) => this.setWorkoutDescription(text)}
                    value={workout.description}/>
                </Block>
              )
            }
          </ScrollView>
        </Block>
        <Block row  space="between" style={{marginBottom: 30, alignSelf: 'stretch'}}>
          <Button small back onPress={this.cancelPressHandler}>
            {stepOne ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onPress={this.savePressHandler}
            style={{marginLeft: 'auto', width: 100,}}>
            {
              stepOne ? 'Next' : 'Save'
            }
          </Button>
        </Block>
      </Wrap>
    )
  }
}

const styles = StyleSheet.create({
  switchWrap: {
    marginBottom: theme.SIZES.BASE / 2,
    marginRight: theme.SIZES.BASE / 2,
    width: 120,
    alignItems: 'center'
  },
  switchersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16
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
    marginBottom: theme.SIZES.BASE * 1.25
  },
  date: {
    zIndex: 30,
    color: theme.COLORS.TEXT,
    position: 'relative',
  },
});

const mapStateToProps = state => {
  return {
    styles: state.stylesReducer.styles,
  }
};


export default connect(mapStateToProps)(CreateWorkout)
