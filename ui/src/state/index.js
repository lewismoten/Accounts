import { combineReducers } from 'redux';

const INITIAL_STATE = {};
const reducers = {};

const sliceReducers = combineReducers(reducers);

const rootReducer = (state = INITIAL_STATE, action) => {
  return sliceReducers(state, action);
};

export default rootReducer;