import {GET_STYLES} from '../actions/types';

const initialState = {
  exStyles: [],
};

const stylesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STYLES:
      return {
        ...state,
        exStyles: action.data,
      };
    default:
      return state;
  }
};

export default stylesReducer;
