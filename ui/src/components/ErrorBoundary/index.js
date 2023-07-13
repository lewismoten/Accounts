import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error, errorInfo) {
    const { onError } = this.props;
    if (typeof onError !== 'function') return;
    try {
      onError(error, errorInfo);
    } catch (e) {
      // do nothing
    }
  }
  render() {
    const { fallback = 'Error', children } = this.props;
    return this.state.failed ? <Element>{fallback}</Element> : children;
  }
}

const Element = ({ children }) =>
  React.isValidElement(children) ? children : <Fragment>{children}</Fragment>;

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
  onError: PropTypes.func,
};

Element.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;