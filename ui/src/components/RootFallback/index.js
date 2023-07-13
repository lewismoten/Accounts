import React from 'react';
import PropTypes from 'prop-types';

const RootFallback = ({ loading = '' }) => <div>Loading {loading}...</div>;

RootFallback.propTypes = {
  loading: PropTypes.string,
};

export default RootFallback;