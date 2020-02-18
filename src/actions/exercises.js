import {GET_EXERCISES} from "./types";

export const getExercises = (exercises) => ({
  type: GET_EXERCISES,
  data: exercises,
});
