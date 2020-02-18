import {GET_USER} from "../actions/types";

const initialState = {
  user: {

  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.data
      };
    default:
      return state;
  }
}

export default userReducer
