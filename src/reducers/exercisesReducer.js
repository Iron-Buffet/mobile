import {GET_EXERCISES} from '../actions/types';

const initialState = {
  exercises: [],
};

const exercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXERCISES:
      return {
        ...state,
        exercises: action.data,
      };
    default:
      return state;
  }
};

export default exercisesReducer;
