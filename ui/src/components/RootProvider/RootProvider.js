import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import configureStore from '../../state/configureStore';

const { store } = configureStore();

const RootProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

RootProvider.propTypes = {
  children: PropTypes.node,
};

export default RootProvider;