<template>
  <nb-container :style="{ backgroundColor: '#000' }">
    <nb-header>
      <nb-left>
        <nb-button
          transparent
          :onPress="() => this.props.navigation.openDrawer()"
        >
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Certified Workouts</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content>
      <WorkoutsList @goToWorkout="goToWorkout" />
    </nb-content>
  </nb-container>
</template>

<script>
  import WorkoutsList from '../WorkoutsList/index'
export default {
  components: {
    WorkoutsList
  },
  props: {
    navigation: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    goToWorkout(id) {
      console.log(id)
      this.navigation.navigate('ViewWorkout', {id});
    }
  }
};
</script>

<style>
.body-icon-color {
  color: #999;
}
</style>
