import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import { $get } from '../utils/Fetch';
import { Wrap, Text, Button, WorkoutCard } from '../components'


export default class Workouts extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      workouts: [],
    }
  }

  componentDidMount() {
    const {url, navigation} = this.props;
    const parts = navigation.getParam('parts');

    return $get(url + '?filter[parts]=' + parts.join(','))
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          workouts: responseJson,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  renderWorkouts = () => {
    const { navigation, workoutPath, createWorkoutPath } = this.props;
    if (this.state.workouts.length === 0) {
      return (
        <Block style={{paddingBottom: 30}} flex space="between">
          <Block flex center middle>
            <Text title>You have no workouts</Text>
          </Block>
          <Button onPress={() => navigation.navigate(createWorkoutPath)}>
            Add new workout
          </Button>
        </Block>
      )
    }

    const workouts = this.state.workouts.map(w => {
      return (
        <WorkoutCard
          workoutPath={workoutPath}
          key={`workout-${w.id}`}
          workout={w} />)
    });

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Block flex space="between">
          {workouts}
        </Block>
      </ScrollView>
    )
  };

  render () {
    if(this.state.isLoading){
      return(
        <Wrap>
          <ActivityIndicator/>
        </Wrap>
      )
    }

    return(
      <Wrap>
        {this.renderWorkouts()}
      </Wrap>
    );
  }
}

const styles = StyleSheet.create({

});
