import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native';
import {Block} from 'galio-framework';
import {$get} from '../utils/Fetch';
import {Wrap, Text, Button, WorkoutCard} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';

const Workouts = ({url, workoutPath, createWorkoutPath}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state, setState] = React.useState({
    isLoading: true,
    workouts: [],
  });

  React.useEffect(() => {
    const parts = route.params.parts;
    $get(url + '?filter[parts]=' + parts.join(','))
      .then(responseJson => {
        setState({
          ...state,
          isLoading: false,
          workouts: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
    //eslint-disable-next-line
  }, []);

  const renderWorkouts = () => {
    if (state.workouts.length === 0) {
      return (
        <Block style={styles.container} flex space="between">
          <Block flex center middle>
            <Text title>You have no workouts</Text>
          </Block>
          <Button onPress={() => navigation.navigate(createWorkoutPath)}>
            Add new workout
          </Button>
        </Block>
      );
    }

    const workouts = state.workouts.map(w => {
      return (
        <WorkoutCard
          workoutPath={workoutPath}
          key={`workout-${w.id}`}
          workout={w}
        />
      );
    });

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block flex space="between">
          {workouts}
        </Block>
      </ScrollView>
    );
  };

  if (state.isLoading) {
    return (
      <Wrap>
        <ActivityIndicator />
      </Wrap>
    );
  }

  return <Wrap>{renderWorkouts()}</Wrap>;
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30
  },
});

export default Workouts;
