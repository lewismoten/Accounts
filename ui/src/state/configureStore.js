/* eslint-env node */
import { configureStore } from '@reduxjs/toolkit';
import reduxSaga from 'redux-saga';
import reduxThunk from 'redux-thunk';

import rootReducer from './index';
import rootSaga from './saga';

const sagaMiddleware = reduxSaga();

const initialState = undefined;

const configureStore2 = () => {
  const store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxThunk, sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState
  });

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./index', () => {
      const reducers = require('./index').default;
      store.replaceReducer(reducers);
    });
  }

  sagaMiddleware.run(rootSaga);

  return { store };
};

export default configureStore2;