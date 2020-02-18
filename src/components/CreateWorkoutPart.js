import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Block} from "galio-framework";
import {Button, Text} from "./index";
import theme from "../constants/Theme";
import { connect } from 'react-redux';
import AddExerciseForm from '../components/AddExerciseForm'


const baseExercise = {
  exercise: null,
  sets: '',
  reps: '',
  weight: '',
  style: null,
  notes: null
};

class CreateWorkoutPart extends React.Component {

  state = {
    exercises: [
      {...baseExercise}
    ]
  };

  componentDidUpdate(prevProps) {
    const { onPartUpdated, part } = this.props;
    const { exercises } = this.state;
    if (part.exercises !== exercises || exercises[0] === baseExercise) {
      onPartUpdated(this.state.exercises)
    }
  }

  formStateUpdated = (formState, i) => {
    const { exercises } = this.state;
    const before = exercises.slice(0, i);
    const after = exercises.slice(i + 1);
    this.setState(() => {
      return {
        exercises: [
          ...before,
          formState,
          ...after
        ]
      }
    })
  };

  removeExerciseHandler = (i) => {
    let exercises = [...this.state.exercises];
    exercises.splice(i, 1);
    this.setState({
      exercises
    });
  };

  addExerciseHandler = () => {
    const newExercises = this.state.exercises.concat(baseExercise);
    this.setState({
      exercises: newExercises
    })
  };

  render () {
    const {part} = this.props;
    const stateExercises = this.state.exercises;

    return (
      <Block style={styles.workoutCard}>
        <Block style={styles.stretchRow}>
          <Text style={{fontSize: 24}}>{part.name}</Text>
          <Button small onPress={() => this.addExerciseHandler()}>
            Add Exercise
          </Button>
        </Block>
        {
          stateExercises.map((se, i) => {
            return (
              <Block key={`ne${i}`} style={{position: 'relative'}}>
                {
                  i > 0 ? (
                    <TouchableOpacity style={styles.delete} onPress={() => this.removeExerciseHandler(i)}>
                      <Text style={styles.del}>&times;</Text>
                    </TouchableOpacity>
                  ) : null
                }
                <AddExerciseForm
                  onStateUpdate={(formState) => this.formStateUpdated(formState, i)}
                  part={part} />
              </Block>
            )
          })
        }
      </Block>
    )
  }
}


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
    right: -10
  },
  del: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
    lineHeight: 23
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
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 3,
    marginHorizontal: 10,
    marginTop: 7,
    position: 'relative'
  },
});


const mapStateToProps = state => {
  return {
    exercises: state.exercisesReducer.exercises
  }
}


export default connect(mapStateToProps)(CreateWorkoutPart)
