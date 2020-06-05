import {GET_STYLES} from '../actions/types';

const initialState = {
  styles: [],
};

const stylesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STYLES:
      return {
        ...state,
        styles: action.data,
      };
    default:
      return state;
  }
};

export default stylesReducer;
