import {createStore, combineReducers} from 'redux';
import userReducer from './reducers/userReducer'
import stylesReducer from './reducers/stylesReducer'
import exercisesReducer from './reducers/exercisesReducer'

const rootReducer = combineReducers({
  userReducer: userReducer,
  stylesReducer: stylesReducer,
  exercisesReducer: exercisesReducer,
})

const configureStore = () => createStore(rootReducer);

export default configureStore
