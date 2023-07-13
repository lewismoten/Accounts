import { combineReducers } from 'redux';
import theme from './theme';

const INITIAL_STATE = {};
const reducers = {
    theme
};

const sliceReducers = combineReducers(reducers);

const rootReducer = (state = INITIAL_STATE, action) => {
  return sliceReducers(state, action);
};

export default rootReducer;